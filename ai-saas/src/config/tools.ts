import ImageGenerator from "@/components/dashboard/tools/image-generator";
import Model3dGenerator from "@/components/dashboard/tools/model-3d-generator";
import Optimize from "@/components/dashboard/tools/optimize";
import RemoveBackground from "@/components/dashboard/tools/remove-bg";

export const tools = {
    "image-generator": {
        title: "画像生成",
        description: "AIを使用してお好みの画像を生成",
        component: ImageGenerator,
    },
    "remove-bg": {
        title: "背景削除",
        description: "画像から背景を自動で削除",
        component: RemoveBackground,
    },
    "optimize": {
        title: "画像圧縮",
        description: "画像を最適化してサイズを縮小",
        component: Optimize,
    },
    "3d-model-generator": {
        title: "3Dモデル生成",
        description: "テキストや画像から3Dモデルを生成",
        component: Model3dGenerator,
    },
}

export type ToolType = keyof typeof tools;