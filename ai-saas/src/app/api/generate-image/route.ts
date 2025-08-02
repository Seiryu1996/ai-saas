import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

export async function POST(req: Request) {
    const { keyword } = await req.json();
    console.log(keyword);
    try {
        const formData = new FormData();
        // 一部日本語対応していないため、英語化するAPIに変更する必要あり
        formData.append("prompt", `Create Image with ${keyword}`);
        formData.append("output_format", "png");
        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/core`,
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
        const optimizedImage = await sharp(response.data)
            .resize(1280, 720)
            .png({ quality: 80, compressionLevel: 9 })
            .toBuffer();
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