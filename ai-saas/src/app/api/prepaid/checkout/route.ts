import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db/prisma";
import { stripe } from "@/config/stripe";
import { PREPAID_PACKAGES, type PrepaidPackageId } from "@/config/prepaid";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { packageId } = body as { packageId: string };

    const packageKeyMap: Record<string, PrepaidPackageId> = {
      'mini': 'MINI',
      'starter': 'STARTER', 
      'standard': 'STANDARD',
      'premium': 'PREMIUM',
      'deluxe': 'DELUXE',
      'ultimate': 'ULTIMATE',
    };

    const packageKey = packageKeyMap[packageId];
    if (!packageKey) {
      return NextResponse.json(
        { error: "無効なパッケージIDです" },
        { status: 400 }
      );
    }

    const packageInfo = PREPAID_PACKAGES[packageKey];
    if (!packageInfo) {
      return NextResponse.json(
        { error: "パッケージ情報が見つかりません" },
        { status: 400 }
      );
    }

    if (!packageInfo.priceId) {
      return NextResponse.json(
        { error: "このパッケージは現在利用できません" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    let stripeCustomerId = user.stripeCustomerId;
    
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          clerkId: userId,
        },
      });
      
      stripeCustomerId = customer.id;
      
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: packageInfo.priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/dashboard?prepaid_success=true`,
      cancel_url: `${process.env.BASE_URL}/dashboard?prepaid_canceled=true`,
      metadata: {
        userId: user.id,
        packageId: packageKey,
        creditsAmount: packageInfo.credits.toString(),
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error("Prepaid checkout error:", error);
    return NextResponse.json(
      { error: "決済処理でエラーが発生しました" },
      { status: 500 }
    );
  }
}