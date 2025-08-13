import Link from "next/link";
import AuthButton from "../auth/auth-button";
import CreditDisplay from "./credit-display";
import NavItems from "./nav-items";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/utils/utils";

const DashboardNav = async () => {
    const result = await getUser();
    const user = "user" in result ? result.user : null;
    const dbUser = "dbUser" in result ? result.dbUser : null;
    
    return (
        <nav className="grid gap-2 items-start">
            <NavItems />

            <div className="my-4 px-4 md:hidden">
                <AuthButton />
            </div>

            <div className="p-4">
                <CreditDisplay />
                {user && dbUser?.stripeCustomerId && (
                    <Button asChild className="w-full mt-4 text-white" variant={"premium"}>
                        <Link href={"/dashboard/plan"}>アップグレード</Link>
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default DashboardNav;