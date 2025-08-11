import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { optimizeImage } from "@/utils/utils";
import { API } from "@/config/stability-api";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const inputType = formData.get("inputType") as string;
        let imageBuffer: Buffer;
        if (inputType === "text") {
            const keyword = formData.get("keyword") as string;
            if (!keyword) {
                throw new Error("キーワードが必要です");
            }
            const imageFormData = new FormData();
            imageFormData.append("prompt", `Create Image with [${keyword}], resolution 1280x720`);
            imageFormData.append("output_format", "png");
            const imageResponse = await axios.postForm(
                API.IMAGE,
                imageFormData,
                {
                    validateStatus: undefined,
                    responseType: "arraybuffer",
                    headers: { 
                        Authorization: `Bearer ${process.env.GENERATE_API_KEY}`, 
                        Accept: "image/*"
                    },
                }
            );            
            if (imageResponse.status !== 200) {
                throw new Error(`Image generation failed: ${imageResponse.status}`);
            }
            const rawImageBuffer = Buffer.from(imageResponse.data);
            imageBuffer = await optimizeImage(rawImageBuffer);
        } else if (inputType === "image") {
            const imageFile = formData.get("image") as File;
            if (!imageFile) {
                throw new Error("画像ファイルが必要です");
            }
            const arrayBuffer = await imageFile.arrayBuffer();
            const rawImageBuffer = Buffer.from(arrayBuffer);
            imageBuffer = await optimizeImage(rawImageBuffer);
        } else {
            throw new Error("無効な入力タイプです");
        }
        const modelFormData = new FormData();
        modelFormData.append("image", imageBuffer, "image.png");
        modelFormData.append("texture_resolution", "1024");
        modelFormData.append("foreground_ratio", "0.85");
        const modelResponse = await axios.postForm(
            API.THREE_MODEL,
            modelFormData,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: {
                    Authorization: `Bearer ${process.env.GENERATE_API_KEY}`,
                    Accept: "model/gltf-binary"
                },
            }
        );        
        if (modelResponse.status !== 200) {
            let errorMessage = `3D model generation failed: ${modelResponse.status}`;
            if (modelResponse.data) {
                try {
                    const errorText = Buffer.from(modelResponse.data).toString();
                    console.log("3D API error response:", errorText);
                    errorMessage += ` - ${errorText}`;
                } catch (e) {
                    console.log("Could not parse error response");
                }
            }
            throw new Error(errorMessage);
        }
        const base64Model = Buffer.from(modelResponse.data).toString("base64");
        return NextResponse.json({ 
            modelData: base64Model,
            modelType: "glb",
            generatedImage: inputType === "text" ? `data:image/png;base64,${imageBuffer.toString("base64")}` : undefined
        });
        
    } catch (error) {
        console.error("3D model generation error:", error);
        return NextResponse.json(
            { error: "3Dモデルの生成に失敗しました" },
            { status: 500 }
        );
    }
}