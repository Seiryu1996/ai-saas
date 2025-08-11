"use client";

import { useActionState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { removeBackground } from "@/actions/actions";
import { RemoveBackgroundState } from "@/types/actions";
import { Download, ImageIcon, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../../common/loading-spinner";
import { download } from "@/utils/client-utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import { CREDITS } from "@/config/credits";

const initialState: RemoveBackgroundState = {
    status: "idle",
};

const RemoveBackground= () => {
    const { isSignedIn } = useUser();
    const [state, formAction, isPending] = useActionState(
        removeBackground,
        initialState
    );

    const handleDownload = () => {
        if (!state.processedImage) {
            return;
        }
        download(state.processedImage, "remove-background");
    }
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image">ファイルをアップロード</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full"
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            {CREDITS.REMOVE_BG}クレジット消費
                        </p>
                    </div>
                    {/** submit button */}
                    {isSignedIn ? (
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn("w-full duration-200", isPending && "bg-primary/80")}
                        >
                            {isPending ? (
                                <LoadingSpinner />
                            ) : <>
                                <Layers className="mr-2" />
                                背景削除
                            </>}
                        </Button>
                    ) : (
                        <SignInButton>
                            <Button className="w-full">
                                <ImageIcon className="mr-2" />
                                ログインして背景削除
                            </Button>
                        </SignInButton>
                    )}
                </form>
            </div>
            {/** image preview */}
            {state.processedImage && (
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border bg-background">
                        <div className="aspect-video relative">
                            <img
                                src={state.processedImage}
                                alt="Generated image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <Button
                        className="w-full"
                        variant={"outline"}
                        onClick={handleDownload}
                    >
                        <Download className="mr-2" />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default RemoveBackground;