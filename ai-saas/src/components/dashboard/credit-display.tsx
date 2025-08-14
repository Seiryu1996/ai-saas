import { getUserCredits } from "@/lib/db/services/credits";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import CreditDisplayWrapper from "./credit-display-wrapper";

async function CreditContent() {
    noStore();
    const user = await currentUser();
    if (user) {
        const credits = await getUserCredits();
        return <div className="mt-2 font-bold">{credits} クレジット</div>;
    }
    return null;
}

const CreditDisplay = async () => {
    return (
        <CreditDisplayWrapper>
            <CreditContent />
        </CreditDisplayWrapper>
    );
}

export default CreditDisplay;