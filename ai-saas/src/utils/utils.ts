import { prisma } from "@/lib/db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import sharp from "sharp";

export async function optimizeImage(data: Buffer): Promise<Buffer> {
  return await sharp(data)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
}

type GetUserResult =
  | { user: any; dbUser: any }
  | { error: string; status: number };

export async function getUser(includeSubscriptions = false, select?: any): Promise<GetUserResult> {
  try {
    const user = await currentUser();
    if (!user) {
      return { error: "Unauthorized", status: 401 };
    }

    const queryOptions: any = { where: { clerkId: user.id } };
    if (select) {
      queryOptions.select = select;
    } else if (includeSubscriptions) {
      queryOptions.include = { subscriptions: true };
    }

    const dbUser = await prisma.user.findUnique(queryOptions);

    return { user, dbUser };
  } catch (error) {
    return { error: "Internal Error", status: 500 };
  }
}