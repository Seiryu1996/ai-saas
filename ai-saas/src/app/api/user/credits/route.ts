import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { CreditService } from "@/lib/services/credit";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const creditService = new CreditService();
    const credits = await creditService.getUserCredits(userId);

    return NextResponse.json(credits);

  } catch (error) {
    console.error("Credits fetch error:", error);
    return NextResponse.json(
      { error: "クレジット情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}