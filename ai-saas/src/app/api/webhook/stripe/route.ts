import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/db/prisma";
import { handleSubscriptionCreated, handleSubscriptionDeleted, handleSubscriptionUpdated } from "@/lib/subscription/events/events";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
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
                return NextResponse.json(
                    {
                        error: "Webhook Error"
                    },
                    {
                        status: 400
                    },
                );
            }
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
                    handleSubscriptionUpdated(subscription);
                    break;
                case 'customer.subscription.deleted':
                    handleSubscriptionDeleted(subscription);
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