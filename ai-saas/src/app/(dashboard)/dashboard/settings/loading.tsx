import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span className="text-muted-foreground">読み込み中...</span>
            </div>
        </div>
    );
}