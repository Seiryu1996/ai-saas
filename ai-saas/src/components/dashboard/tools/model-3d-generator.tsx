"use client";

import { useActionState, useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { generate3dModel } from "@/actions/actions";
import { Generate3dModelState } from "@/types/actions";
import { Download, BoxIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../../common/loading-spinner";
import { download } from "@/utils/client-utils";
import { SignInButton, useUser } from "@clerk/nextjs";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import ModelViewer from "../../common/model-viewer";

const initialState: Generate3dModelState = {
    status: "idle",
};

const Model3dGenerator = () => {
    const { isSignedIn } = useUser();
    const [state, formAction, isPending] = useActionState(
        generate3dModel,
        initialState
    );
    const [inputType, setInputType] = useState("text");
    const [sampleModelData, setSampleModelData] = useState<string | null>(null);
    
    const loadSampleModel = async () => {
        try {
            const response = await fetch('/sample-model.glb');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = function(e) {
                const result = e.target?.result as string;
                if (result) {
                    const base64 = result.split(',')[1];
                    setSampleModelData(base64);
                    console.log('Sample model loaded successfully, size:', blob.size);
                }
            };
            reader.onerror = function() {
                throw new Error('FileReader error');
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error loading test model:', error);
            alert('サンプルモデルの読み込みに失敗しました: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };
    const handleImageDownload = () => {
        if (!state.originalImage) {
            return;
        }
        download(state.originalImage, `${state.keyword}`);
    }
    const handleDownload = () => {
        if (!state.modelData || !state.modelType) {
            return;
        }
        
        try {
            const binaryString = atob(state.modelData);
            const bytes = new Uint8Array(binaryString.length);
            const chunkSize = 8192;
            for (let i = 0; i < binaryString.length; i += chunkSize) {
                const chunk = binaryString.slice(i, i + chunkSize);
                for (let j = 0; j < chunk.length; j++) {
                    bytes[i + j] = chunk.charCodeAt(j);
                }
            }
            const blob = new Blob([bytes], { type: `model/${state.modelType}` });
            const url = URL.createObjectURL(blob);
            const filename = state.keyword ? `${state.keyword}.${state.modelType}` : `3d-model.${state.modelType}`;
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('ダウンロードに失敗しました');
        }
    }

    return (
        <div className="space-y-4">
            {/* Sample Image & Model Viewer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                    {/* Sample Image */}
                    <div className="lg:col-span-1">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">サンプル画像</h3>
                        <div className="w-40 h-40 mx-auto lg:mx-0 border-2 border-blue-300 rounded-lg overflow-hidden bg-white">
                            <img 
                                src="/sample-model.png" 
                                alt="Sample model"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-xs text-blue-600 mt-1 text-center lg:text-left">Fighting cat vs dog</p>
                    </div>
                    
                    {/* Arrow - Hidden on mobile, shown on large screens */}
                    <div className="hidden lg:flex justify-center items-center lg:col-span-1">
                        <div className="text-blue-400 text-xl">→</div>
                    </div>
                    
                    {/* Sample 3D Model */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-blue-800">生成される3Dモデル</h3>
                            <Button 
                                onClick={loadSampleModel} 
                                variant="outline" 
                                size="sm"
                                className="text-xs h-6 px-2 text-blue-600 border-blue-300"
                            >
                                プレビュー
                            </Button>
                        </div>
                        <div className="border-2 border-blue-300 rounded-lg overflow-hidden bg-white h-72 lg:h-72">
                            {sampleModelData ? (
                                <ModelViewer 
                                    modelData={sampleModelData}
                                    className="h-full"
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-blue-400">
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">📦</div>
                                        <p className="text-sm">プレビューを押して<br/>3Dモデルを表示</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-xs text-blue-600 mt-3 text-center">
                    💡 画像から3Dモデルを生成するイメージです。実際の結果は画像の内容によって異なります。
                </p>
            </div>
            
            <div className="space-y-4">
                <form action={formAction} className="space-y-4">
                    <input type="hidden" name="inputType" value={inputType} />
                    
                    {/* Input Type */}
                    <div className="space-y-2">
                        <Label>入力方法を選択</Label>
                        <RadioGroup value={inputType} onValueChange={setInputType} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="text" id="text" />
                                <Label htmlFor="text">テキストから生成</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="image" id="image" />
                                <Label htmlFor="image">画像から生成</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Input Text */}
                    {inputType === "text" && (
                        <div className="space-y-2">
                            <Label htmlFor="keyword">キーワード</Label>
                            <Input
                                id="keyword"
                                name="keyword"
                                placeholder="3Dモデルにしたいオブジェクトのキーワードを英語で入力(例：Car、House、Chair)"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                テキスト→画像→3Dモデルの順で生成されます（2クレジット消費）
                            </p>
                        </div>
                    )}

                    {/* Image Upload */}
                    {inputType === "image" && (
                        <div className="space-y-2">
                            <Label htmlFor="image">画像ファイル</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                アップロードした画像から3Dモデルを生成します（2クレジット消費）
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    {isSignedIn ? (
                        <Button
                            type="submit"
                            disabled={isPending}
                            className={cn("w-full duration-200", isPending && "bg-primary/80")}
                        >
                            {isPending ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <BoxIcon className="mr-2" />
                                    3Dモデル生成
                                </>
                            )}
                        </Button>
                    ) : (
                        <SignInButton>
                            <Button className="w-full">
                                <BoxIcon className="mr-2" />
                                ログインして3Dモデル生成
                            </Button>
                        </SignInButton>
                    )}
                </form>
            </div>

            {/* Result */}
            {state.status === "success" && (
                <div className="space-y-4">
                    {/* Generate Image */}
                    {state.originalImage && (
                        <div className="space-y-2">
                            <Label>生成された画像</Label>
                            <div className="overflow-hidden rounded-lg border bg-background">
                                <div className="relative">
                                    <img
                                        src={state.originalImage}
                                        alt="Generated image"
                                        className="w-full h-auto object-contain max-h-96"
                                    />
                                </div>
                            </div>
                            <Button
                                className="w-full"
                                variant={"outline"}
                                onClick={handleImageDownload}
                            >
                                <Download className="mr-2" />
                            </Button>
                        </div>
                    )}

                    {/* 3D Model Viewer */}
                    {state.modelData && (
                        <div className="space-y-2">
                            <Label>生成された3Dモデル</Label>
                            <ModelViewer 
                                modelData={state.modelData}
                                className="mb-4"
                            />
                            <p className="text-xs text-muted-foreground">
                                マウスで回転・ズーム・パンができます
                            </p>
                            <Button
                                className="w-full"
                                variant="outline"
                                onClick={handleDownload}
                            >
                                <Download className="mr-2" />
                                3Dモデルをダウンロード（{state.modelType?.toUpperCase()}形式）
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* Error */}
            {state.status === "error" && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <p className="text-red-600">{state.error}</p>
                </div>
            )}
        </div>
    );
}

export default Model3dGenerator;