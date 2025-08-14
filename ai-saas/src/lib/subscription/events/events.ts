import { PLAN_PRIORITY, PLANS } from "@/config/plans";
import { stripe } from "@/config/stripe";
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

function isUpgrade(previousPriceId: string | undefined, priceId: string): boolean {
    if (!previousPriceId) return false;
    return PLAN_PRIORITY[priceId] > PLAN_PRIORITY[previousPriceId];
}

function addCreditsForUpgrade(previousPriceId: string | undefined, priceId: string) {
    if (!previousPriceId) return 0;
    if ((PLAN_PRIORITY[priceId] - PLAN_PRIORITY[previousPriceId]) === 2) {
        return PLANS.PRO.CREDIT;
    }
    return PLANS.BASIC.CREDIT
}

export function getSubscriptionPreviousPriceId(data: Stripe.Event.Data) {
    const previous = data.previous_attributes as Record<string, any> | undefined;
    let previousPriceId: string | undefined = undefined;
    if (previous?.items?.data?.[0]?.price?.id) {
        previousPriceId = previous.items.data[0].price.id;
    } else if (previous?.plan?.id) {
        previousPriceId = previous.plan.id;
    }
    return previousPriceId;
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

export async function handleSubscriptionUpdated(
    subscription: Stripe.Subscription,
    previousPriceId: string | undefined
) {
    if (subscription.status === "active") {
        const {
            subscriptionStatus,
            currentPeriodEnd,
            priceId
        } = getPlanDetails(subscription);
        if (subscription.cancel_at_period_end) {
            handleSubscriptionDeleted(subscription);
        } else {
            const upgrated = isUpgrade(previousPriceId, priceId);

            if (!upgrated) return;

            const addCredits = addCreditsForUpgrade(previousPriceId, priceId);
            await prisma.user.update({
                where: { stripeCustomerId: subscription.customer as string },
                data: {
                    subscriptionStatus: subscriptionStatus,
                    credits: {
                        increment: addCredits,
                    },
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

export async function handleSubscriptionMonthUpdate(data: Stripe.Event.Data) {
    const invoice = data.object as Stripe.Invoice;
    const subscriptionId = (invoice as any).subscription as string | undefined;
    if (invoice.billing_reason === "subscription_cycle" && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const {
            subscriptionStatus,
            credits,
            currentPeriodEnd,
            priceId
        } = getPlanDetails(subscription);
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