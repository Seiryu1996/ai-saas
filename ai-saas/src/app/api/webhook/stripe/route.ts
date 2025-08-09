import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/db/prisma";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    let event;
    const body = await req.text();
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (endpointSecret) {
        const signature = req.headers.get('stripe-signature') as string;
        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                endpointSecret
            );
        } catch (error) {
            console.log(`⚠️  Webhook signature verification failed.`, error);
            return new NextResponse("Webhook Error", { status: 400 });
        }

        if (!event) {
            return new NextResponse("Webhook Event Error", { status: 500 });
        }

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session;
                if (!session.metadata || !session?.subscription) {
                    return new NextResponse("Session Error", { status: 500 });
                }
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription?.toString()
                );

                const user = await prisma.user.findUnique({
                    where: { clerkId: session.metadata.clerkId },
                  });
                if (!user) throw new Error("User not found");

                let subscriptionStatus: SubscriptionStatus = "FREE";
                switch (subscription.items.data[0].price.id) {
                    case "price_1RtsAu0wr7BuiSCutWpYpLfd":
                        subscriptionStatus = "BASIC";
                        break;
                    case "price_1RtsBH0wr7BuiSCueYOEvMw9":
                        subscriptionStatus = "PRO";
                        break;
                }

                await prisma.subscription.upsert({
                    where: { userId: user.id },
                    update: {
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(
                            subscription.items.data[0].current_period_end
                        ),
                    },
                    create: {
                        userId: user.id,
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(
                            subscription.items.data[0].current_period_end
                        ),
                    },
                });

                await prisma.user.update({
                    where: { id: user.id },
                    data: { subscriptionStatus },
                });

                break;
            case 'customer.subscription.created':
                const subscriptionUpdated = event.data.object as Stripe.Subscription;
                let credits = 30;
                if (subscriptionUpdated.status === "active") {
                    switch(subscriptionUpdated.items.data[0].price.id) {
                        case "price_1RtsAu0wr7BuiSCutWpYpLfd":
                            credits = 300;
                            break;
                        case "price_1RtsBH0wr7BuiSCueYOEvMw9":
                            credits = 600;
                            break;
                    }

                    await prisma.user.update({
                        where: { stripeCustomerId: subscriptionUpdated.customer as string },
                        data: {
                            credits: credits,
                        },
                    });
                }
                break;
        }
        return new NextResponse(null, { status: 200 });
    }
}