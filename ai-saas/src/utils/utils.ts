import sharp from "sharp";

/**
 * 画像バッファを最適化(リサイズ・圧縮)
 * @param data 画像データのBuffer
 * @returns 最適化後の画像Buffer
 */
export async function optimizeImage(data: Buffer): Promise<Buffer> {
  return await sharp(data)
    .resize(1280, 720)
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer();
}
