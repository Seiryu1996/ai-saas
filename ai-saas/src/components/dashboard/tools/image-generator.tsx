"use client";

import { useActionState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { generateImage } from "@/actions/actions";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../../common/loading-spinner";
import { download } from "@/utils/client-utils";
import { SignInButton, useUser } from "@clerk/nextjs";


const initialState: GenerateImageState = {
    status: "idle",
};

const ImageGenerator= () => {
    const { isSignedIn } = useUser();
    const [state, formAction, isPending] = useActionState(
        generateImage,
        initialState
    );

    const handleDownload = () => {
        if (!state.imageUrl) {
            return;
        }
        download(state.imageUrl, `${state.keyword}.png`);
    }
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="keyword">キーワード</Label>
                        <Input
                            id="keyword"
                            name="keyword"
                            placeholder="作成したい画像のキーワードを英語で入力(例：Sea、Moutain、City、Natural)"
                            required
                        />
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
                            <ImageIcon className="mr-2" />
                            画像生成
                        </>}
                    </Button>
                    ) : (
                        <SignInButton>
                            <Button className="w-full">
                                <ImageIcon className="mr-2" />
                                ログインして画像生成
                            </Button>
                        </SignInButton>
                    )}
                </form>
            </div>
            {/** image preview */}
            {state.imageUrl && (
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border bg-background">
                        <div className="aspect-video relative">
                            <img
                                src={state.imageUrl}
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

export default ImageGenerator;