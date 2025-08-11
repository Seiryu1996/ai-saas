import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { optimizeImage } from "@/utils/utils";
import { API } from "@/config/stability-api";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    if (!file) {
        return NextResponse.json(
            {
                error: "画像ファイルを選択してください",
            },
            {
                status: 400
            }
        );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalImage = await optimizeImage(buffer);
    try {
        const formData = new FormData();
        formData.append("image", originalImage, {
            filename: "image.png",
            contentType: "image/png",
        });
        formData.append("output_format", "png");
        const response = await axios.post(
            API.REMOVE,
            formData,
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                    Authorization: `Bearer ${process.env.GENERATE_API_KEY}`, 
                    Accept: "image/*"
                },
            },
        );

        if(response.status !== 200) {
            throw new Error(`API error: ${response.status}`)
        }
        const optimizedImage = await optimizeImage(response.data);
        const base64Image = optimizedImage.toString("base64");
        const imageUrl = `data:image/png;base64,${base64Image}`;

        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to generate image"
            },
            {
                status: 500
            }
        );
    }
}