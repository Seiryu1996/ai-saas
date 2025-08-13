import { prisma } from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import sharp from "sharp";

/**
 * 画像バッファを最適化（元のサイズを保持、圧縮のみ）
 * @param data 画像データのBuffer
 * @returns 最適化後の画像Buffer
 */
export async function optimizeImage(data: Buffer): Promise<Buffer> {
  // 元の画像サイズを保持し、圧縮のみ適用
  return await sharp(data)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
}

type GetUserResult =
  | { user: any; dbUser: any }
  | { error: string; status: number };

export async function getUser(): Promise<GetUserResult> {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized", status: 401 };
    }

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser?.stripeCustomerId) {
      return { error: "No stripe customer id", status: 400 };
    }

    return { user, dbUser };
  } catch (error) {
    return { error: "Internal Error", status: 500 };
  }
}