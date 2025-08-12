import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function translateToEnglish(japaneseText: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Translate the following Japanese text to English. Return only the translated text without any explanations or additional text:
                        ${japaneseText}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translatedText = response.text().trim();
        
        return translatedText;
    } catch (error) {
        console.error("Translation error:", error);
        return japaneseText;
    }
}