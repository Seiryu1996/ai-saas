import { PLANS } from "@/config/plans";
import { prisma } from "@/lib/db/prisma";
import { SubscriptionStatus } from "@prisma/client";
import Stripe from "stripe";

function getPlanDetails(subscription: Stripe.Subscription) {
    let credits = PLANS.FREE.CREDIT;
    let subscriptionStatus: SubscriptionStatus = SubscriptionStatus.FREE;
    const priceId = subscription.items.data[0].price.id;
    const currentPeriodEnd = new Date(subscription.items.data[0].current_period_end * 1000);
    switch(priceId) {
        case PLANS.BASIC.PRICE_ID:
            subscriptionStatus = SubscriptionStatus.BASIC;
            credits = PLANS.BASIC.CREDIT;
            break;
        case PLANS.PRO.PRICE_ID:
            subscriptionStatus = SubscriptionStatus.PRO;
            credits = PLANS.PRO.CREDIT;
            break;
    }
    return {
        subscriptionStatus,
        credits,
        currentPeriodEnd,
        priceId
    };
}

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    if (subscription.status === "active") {
        const {
            subscriptionStatus,
            credits,
            currentPeriodEnd,
            priceId
        } = getPlanDetails(subscription);
        await prisma.user.update({
            where: {
                stripeCustomerId: subscription.customer as string
            },
            data: {
                credits: credits,
                subscriptionStatus: subscriptionStatus,
                subscriptions: {
                    create: {
                        stripeSubscriptionId: subscription.id,
                        stripePriceId: priceId,
                        stripeCurrentPeriodEnd: currentPeriodEnd,
                    }                    
                },
            },
        });
    }
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    if (subscription.status === "active") {
        let {
            subscriptionStatus,
            credits,
            currentPeriodEnd,
            priceId
        } = getPlanDetails(subscription);
        if (subscription.cancel_at_period_end) {
            handleSubscriptionDeleted(subscription);
        } else {
            await prisma.user.update({
                where: { stripeCustomerId: subscription.customer as string },
                data: {
                    subscriptionStatus: subscriptionStatus,
                    credits: credits,
                    subscriptions: {
                        update: {
                            stripeSubscriptionId: subscription.id,
                            stripePriceId: priceId,
                            stripeCurrentPeriodEnd: currentPeriodEnd,
                        }                    
                    },
                },
            });
        }
    }
}

export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await prisma.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
            subscriptionStatus: SubscriptionStatus.FREE,
            subscriptions: {
                delete: {
                    stripeSubscriptionId: subscription.id,
                }                    
            },
        },
    });
}