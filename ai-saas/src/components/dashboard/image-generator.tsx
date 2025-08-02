"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { generateImage } from "@/actions/actions";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../common/loading-spinner";
import { toast } from "sonner";


const initialState: GenerateImageState = {
    status: "idle",
};

const ImageGenerator= () => {  
    const [state, formAction, isPending] = useActionState(
        generateImage,
        initialState
    );

    const handleDownload = () => {
        if (!state.imageUrl) {
            return;
        }
        try {
            const base64Data = state.imageUrl.split(",")[1];
            const blob = new Blob([Buffer.from(base64Data, "base64")], {
                type: "image/png",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${state.keyword}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast(
                "ダウンロード完了",
                {
                    description: "画像のダウンロードが完了しました"
                }
            );
        } catch (error) {
            console.error("Download error:", error);
            toast.error(
                "エラー",
                {
                    description: "ダウンロードに失敗しました",
                }
            );
        }
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