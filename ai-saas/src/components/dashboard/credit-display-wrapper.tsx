"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2, Lock } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

function LoginRequired({ isLoading = false }: { isLoading?: boolean }) {
    return (
        <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
            {isLoading ? (
                <>
                    <Loader2 className="size-3 animate-spin" />
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

interface CreditDisplayWrapperProps {
    children: ReactNode;
}

export default function CreditDisplayWrapper({ children }: CreditDisplayWrapperProps) {
    const { isLoaded, isSignedIn } = useUser();
    const [forceLoading, setForceLoading] = useState(true);

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setForceLoading(false);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    if (!isLoaded || forceLoading) {
        return (
            <CreditContentFrame>
                <LoginRequired isLoading />
            </CreditContentFrame>
        );
    }

    if (!isSignedIn) {
        return (
            <CreditContentFrame>
                <LoginRequired />
            </CreditContentFrame>
        );
    }

    return (
        <CreditContentFrame>
            {children}
        </CreditContentFrame>
    );
}