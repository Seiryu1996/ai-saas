"use client";

import { useState } from "react";
import "@/styles/slider.css";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Download, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../../common/loading-spinner";
import { download } from "@/utils/client-utils";
import { SignInButton, useUser } from "@clerk/nextjs";

const Optimize= () => {
    const { isSignedIn } = useUser();
    const [quality, setQuality] = useState(80);
    const [isProcessing, setIsProcessing] = useState(false);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [compressedImage, setCompressedImage] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState<number | null>(null);
    const [compressedSize, setCompressedSize] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = () => {
        if (!compressedImage) {
            return;
        }
        download(compressedImage, "compressed-image");
    }

    const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        
        const formData = new FormData(e.currentTarget);
        const file = formData.get("image") as File;
        
        if (!file) {
            setError("画像ファイルを選択してください");
            return;
        }
        
        setIsProcessing(true);
        
        try {
            const originalSize = file.size;
            const originalImageUrl = URL.createObjectURL(file);
            setOriginalImage(originalImageUrl);
            setOriginalSize(originalSize);
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = originalImageUrl;
            });
            
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            
            const compressedDataUrl = quality === 100 
                ? originalImageUrl 
                : canvas.toDataURL('image/jpeg', quality / 100);
            
            const response = await fetch(compressedDataUrl);
            const compressedBlob = await response.blob();
            const compressedSize = quality === 100 ? originalSize : compressedBlob.size;
            
            setCompressedImage(compressedDataUrl);
            setCompressedSize(compressedSize);
            
        } catch (error) {
            console.log(error);
            setError("画像の圧縮に失敗しました");
        } finally {
            setIsProcessing(false);
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form onSubmit={handleImageUpload} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="image">画像ファイルをアップロード</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            className="w-full"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quality">圧縮品質: {quality}%</Label>
                        <input
                            id="quality"
                            name="quality"
                            type="range"
                            min="10"
                            max="100"
                            step="1"
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            style={{ 
                                "--progress": `${((quality - 10) / (100 - 10)) * 100}%` 
                            } as React.CSSProperties}
                        />
                    </div>
                    {isSignedIn ? (
                        <Button
                            type="submit"
                            disabled={isProcessing}
                            className={cn("w-full duration-200", isProcessing && "bg-primary/80")}
                        >
                            {isProcessing ? (
                                <LoadingSpinner />
                            ) : <>
                                <FileImage className="mr-2" />
                                画像圧縮
                            </>}
                        </Button>
                    ) : (
                        <SignInButton>
                            <Button className="w-full">
                                <FileImage className="mr-2" />
                                ログインして画像圧縮
                            </Button>
                        </SignInButton>
                    )}
                </form>
            </div>
            {error && (
                <div className="text-center p-4 bg-destructive/10 text-destructive rounded-lg">
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {compressedImage && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {originalImage && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">元画像</h3>
                                <div className="overflow-hidden rounded-lg border bg-background">
                                    <div className="relative">
                                        <img
                                            src={originalImage}
                                            alt="Original image"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                                {originalSize && (
                                    <p className="text-sm text-muted-foreground">
                                        サイズ: {formatFileSize(originalSize)}
                                    </p>
                                )}
                            </div>
                        )}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">圧縮後</h3>
                            <div className="overflow-hidden rounded-lg border bg-background">
                                <div className="relative">
                                    <img
                                        src={compressedImage}
                                        alt="Compressed image"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                            {compressedSize && (
                                <p className="text-sm text-muted-foreground">
                                    サイズ: {formatFileSize(compressedSize)}
                                </p>
                            )}
                        </div>
                    </div>
                    {originalSize && compressedSize && (
                        <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">
                                品質設定: {quality}% | サイズ削減: {(((originalSize - compressedSize) / originalSize) * 100).toFixed(1)}%
                            </p>
                        </div>
                    )}
                    <Button
                        className="w-full"
                        variant={"outline"}
                        onClick={handleDownload}
                    >
                        <Download className="mr-2" />
                        圧縮画像をダウンロード
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Optimize;