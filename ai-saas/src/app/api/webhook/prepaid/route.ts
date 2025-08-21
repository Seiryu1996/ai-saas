import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === "payment" && session.metadata?.packageId) {
        await handlePrepaidPaymentSuccess(session);
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === "payment" && session.metadata?.packageId) {
        await handlePrepaidPaymentFailure(session, "CANCELED");
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Prepaid webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePrepaidPaymentSuccess(session: Stripe.Checkout.Session) {
  try {
    const { userId, packageId, creditsAmount } = session.metadata!;
    const paymentIntentId = session.payment_intent as string;

    await prisma.prepaidOrder.create({
      data: {
        userId,
        stripePaymentId: paymentIntentId,
        amount: new Prisma.Decimal(session.amount_total! / 100),
        creditsAmount: parseInt(creditsAmount),
        status: "SUCCEEDED",
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        prepaidCredits: {
          increment: parseInt(creditsAmount),
        },
        lastCreditRefill: new Date(),
      },
    });

    console.log(`Prepaid payment successful: User ${userId} purchased ${creditsAmount} credits`);

  } catch (error) {
    console.error("Failed to handle prepaid payment success:", error);
    throw error;
  }
}

async function handlePrepaidPaymentFailure(
  session: Stripe.Checkout.Session, 
  status: "FAILED" | "CANCELED"
) {
  try {
    const { userId, packageId, creditsAmount } = session.metadata!;
    const paymentIntentId = session.payment_intent as string;

    await prisma.prepaidOrder.create({
      data: {
        userId,
        stripePaymentId: paymentIntentId || `session_${session.id}`,
        amount: new Prisma.Decimal(session.amount_total! / 100),
        creditsAmount: parseInt(creditsAmount),
        status,
      },
    });

    console.log(`Prepaid payment ${status.toLowerCase()}: User ${userId}`);

  } catch (error) {
    console.error(`Failed to handle prepaid payment ${status.toLowerCase()}:`, error);
    throw error;
  }
}