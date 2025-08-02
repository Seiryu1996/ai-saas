import { toast } from "sonner";

/**
 * ダウンロード
 * @param image imageファイルのURL
 * @param name ダウンロードファイル名
 * @returns 
 */
export function download(image: string, name: string) {
    try {
        const base64Data = image.split(",")[1];
        const blob = new Blob([Buffer.from(base64Data, "base64")], {
            type: "image/png",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast(
            "ダウンロード完了",
            {
                description: "画像のダウンロードが完了しました"
            }
        );
    } catch (error) {
        console.error("Download error:", error);
        toast.error(
            "エラー",
            {
                description: "ダウンロードに失敗しました",
            }
        );
    }
}