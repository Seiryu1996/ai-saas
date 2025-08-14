import { stripe } from "@/config/stripe";
import {
    getSubscriptionPreviousPriceId,
    handleSubscriptionCreated,
    handleSubscriptionDeleted,
    handleSubscriptionMonthUpdate,
    handleSubscriptionUpdated
} from "@/lib/subscription/events/events";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        let event;
        const body = await req.text();
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (endpointSecret) {
            const signature = req.headers.get('stripe-signature') as string;
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                endpointSecret
            );
            if (!event) {
                return NextResponse.json(
                    {
                        error: "Webhook Event Error"
                    },
                    {
                        status: 500
                    },
                );
            }
            const subscription = event.data.object as Stripe.Subscription;

            switch (event.type) {
                case 'customer.subscription.created':
                    handleSubscriptionCreated(subscription);
                    break;
                case 'customer.subscription.updated':
                    const previousPriceId = getSubscriptionPreviousPriceId(event.data);
                    handleSubscriptionUpdated(subscription, previousPriceId);
                    break;
                case 'customer.subscription.deleted':
                    handleSubscriptionDeleted(subscription);
                    break;
                case "invoice.payment_succeeded":
                    handleSubscriptionMonthUpdate(event.data);
                    break;
            }
            return NextResponse.json(
                {
                    success: true
                },
            );
        }
    } catch (error) {
        return NextResponse.json(
            {
                error: "Internal Server Error"
            },
            {
                status: 500
            },
        );
    }
}