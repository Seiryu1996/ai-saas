import { stripe } from "@/config/stripe";
import { getUser } from "@/utils/utils";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const result = await getUser();
        
        if ('error' in result) {
            return NextResponse.json(
                {
                    error: result.error
                },
                {
                    status: result.status
                },
            );
        }

        const { dbUser } = result;

        const session = await stripe.billingPortal.sessions.create({
            customer: dbUser.stripeCustomerId,
            return_url: `${process.env.BASE_URL}/dashboard/stripe-return`,
        });

        return NextResponse.json(
            {
                url: session.url
            },
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            {
                error: "Internal Error"
            },
            {
                status: 500
            },
        );
    }
}