import ImageGenerator from "@/components/dashboard/image-generator";
import Optimize from "@/components/dashboard/optimize";
import RemoveBg from "@/components/dashboard/remove-bg";

export const tools = {
    "image-generator": {
        title: "画像生成",
        description: "AIを使用してお好みの画像を生成",
        component: ImageGenerator,
    },
    "remove-bg": {
        title: "背景削除",
        description: "画像から背景を自動で削除",
        component: RemoveBg,
    },
    "optimize": {
        title: "画像圧縮",
        description: "画像を最適化してサイズを縮小",
        component: Optimize,
    },
}

export type ToolType = keyof typeof tools;