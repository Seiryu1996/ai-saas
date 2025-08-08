import { getUserCredits } from "@/lib/db/services/credits";
import { currentUser } from "@clerk/nextjs/server";
import { Loader2, Lock } from "lucide-react";
import { ReactNode, Suspense } from "react";

function LoginRequired({ isLoading = false } : { isLoading?: boolean }) {
    return (
        <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
            {isLoading ? (
                <>
                    <Loader2 className="size-3 animate-spin"/>
                    <span className="text-muted-foreground">読み込み中...</span>
                </>
            ) : (
                <>
                    <Lock className="size-3" />
                    <span>ログインが必要です</span>
                </>
            )}
        </div>
    );
}

function CreditContentFrame({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg border bg-background p-4">
            <div className="text-sm font-medium text-muted-foreground">
                残りクレジット
            </div>
            {children}
        </div>
    );
}

async function CreditContent() {
    const user = await currentUser();
    let content;
    if (user) {
        const credits = await getUserCredits();
        content = <div className="mt-2 font-bold">{credits} クレジット</div>;
    } else {
        content = <LoginRequired />;
    }
    return <CreditContentFrame>{content}</CreditContentFrame>;
}

const CreditDisplay= async () => {
    return (
        <Suspense fallback={
            <CreditContentFrame><LoginRequired isLoading /></CreditContentFrame>
        }>
            <CreditContent />
        </Suspense>
    );
}

export default CreditDisplay;