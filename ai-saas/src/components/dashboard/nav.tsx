import Link from "next/link";
import AuthButton from "../auth/auth-button";
import CreditDisplay from "./credit-display";
import NavItems from "./nav-items";
import { Button } from "../ui/button";
import { getUser } from "@/utils/utils";
import { PLANS } from "@/config/plans";
import { headers } from "next/headers";

const DashboardNav = async () => {
    const result = await getUser();
    const user = "user" in result ? result.user : null;
    const dbUser = "dbUser" in result ? result.dbUser : null;
    const headersList = await headers();
    const referer = headersList.get('referer') || '';
    const isFromStripe = referer.includes('stripe.com');
    const creditKey = isFromStripe ? `credit-stripe-${Date.now()}` : `credit-${user?.id || 'guest'}`;
    
    return (
        <nav className="grid gap-2 items-start">
            <NavItems />

            <div className="my-4 px-4 md:hidden">
                <AuthButton />
            </div>

            <div className="p-4">
                <CreditDisplay key={creditKey} />
                {user && dbUser?.subscriptionStatus === PLANS.FREE.NAME && (
                    <Button asChild className="w-full mt-4 text-white" variant={"premium"}>
                        <Link href={"/dashboard/plan"}>アップグレード</Link>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default DashboardNav;