export type GenerateImageState = {
    imageUrl?: string;
    error?: string;
    status: "idle" | "error" | "success";
    keyword?: string;
};

export type RemoveBackgroundState = {
    originalImage?: string;
    processedImage?: string;
    error?: string;
    status: "idle" | "error" | "success";
};

export type Generate3dModelState = {
    originalImage?: string;
    modelData?: string;
    modelType?: string;
    error?: string;
    status: "idle" | "error" | "success";
    keyword?: string;
};

export type OptimizeImageState = {
    originalImage?: string;
    compressedImage?: string;
    error?: string;
    status: "idle" | "error" | "success";
    compressionRatio?: number;
    originalSize?: number;
    compressedSize?: number;
};

export type StripeState = {
    status: "idle" | "success" | "error";
    error: string;
    redirectUrl?: string;
}