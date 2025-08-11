"use server";

import { CREDITS } from "@/config/credits";
import { decrementCredits, getUserCredits } from "@/lib/db/services/credits";
import { GenerateImageState, RemoveBackgroundState, Generate3dModelState } from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function generateImage(
    state: GenerateImageState,
    formData: FormData
): Promise<GenerateImageState> {
    const keyword = formData.get("keyword");
    if (!keyword || typeof keyword !== "string") {
        return {
            status: "error",
            error: "キーワードを入力してください"
        }
    }
    const user = await currentUser();
    if (!user) {
        throw new Error("認証が必要です")
    }
    const credits = await getUserCredits();
    if (credits === null || credits < 1) {
        // try-catch NG
        redirect("/dashboard/plan?reason=insufficient_credits");
    }
    try {
        const response = await fetch(
            `${process.env.BASE_URL}/api/generate-image`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ keyword }),
            }
        );
        const data = await response.json();
        await decrementCredits(user.id);
        revalidatePath("/dashboard");
        return {
            status: "success",
            imageUrl: data.imageUrl,
            keyword: keyword,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            error: "画像の生成に失敗しました"
        };
    }
}

export async function removeBackground(
    state: RemoveBackgroundState,
    formData: FormData
): Promise<RemoveBackgroundState> {
    const image = formData.get("image");
    if (!image) {
        return {
            status: "error",
            error: "画像ファイルを選択してください"
        }
    }
    const user = await currentUser();
    if (!user) {
        throw new Error("認証が必要です")
    }
    const credits = await getUserCredits();
    if (credits === null || credits < 1) {
        // try-catch NG
        redirect("/dashboard/plan?reason=insufficient_credits");
    }
    try {
        const response = await fetch(
            `${process.env.BASE_URL}/api/remove-background`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("背景の削除に失敗しました"); 
        }

        const data = await response.json();
        await decrementCredits(user.id);
        revalidatePath("/dashboard");
        return {
            status: "success",
            processedImage: data.imageUrl,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            error: "背景の削除に失敗しました"
        };
    }
}

export async function generate3dModel(
    state: Generate3dModelState,
    formData: FormData
): Promise<Generate3dModelState> {
    const user = await currentUser();
    if (!user) {
        throw new Error("認証が必要です");
    }
    
    const credits = await getUserCredits();
    if (credits === null || credits < CREDITS.MODEL_3D_GENERATOR) {
        redirect("/dashboard/plan?reason=insufficient_credits");
    }
    
    try {
        const response = await fetch(
            `${process.env.BASE_URL}/api/generate-3d-model`,
            {
                method: "POST",
                body: formData,
            }
        );
        
        if (!response.ok) {
            throw new Error("3Dモデルの生成に失敗しました");
        }
        
        const data = await response.json();
        await decrementCredits(user.id, CREDITS.MODEL_3D_GENERATOR);
        revalidatePath("/dashboard");
        
        return {
            status: "success",
            modelData: data.modelData,
            modelType: data.modelType,
            originalImage: data.generatedImage,
            keyword: formData.get("keyword") as string,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            error: "3Dモデルの生成に失敗しました"
        };
    }
}