import sharp from "sharp";

/**
 * 画像バッファを最適化（元のサイズを保持、圧縮のみ）
 * @param data 画像データのBuffer
 * @returns 最適化後の画像Buffer
 */
export async function optimizeImage(data: Buffer): Promise<Buffer> {
  // 元の画像サイズを保持し、圧縮のみ適用
  return await sharp(data)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
}
