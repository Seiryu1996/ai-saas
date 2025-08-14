"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function StripeReturnPage() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
        
        const timer = setTimeout(() => {
            router.push("/dashboard/settings");
        }, 1500);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <Loader2 className="size-8 animate-spin mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">処理中...</h2>
                <p className="text-muted-foreground">
                    Stripeでの変更を反映しています。
                </p>
            </div>
        </div>
    );
}