import { z } from "zod";

export type ContactData = {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
};

export const contactSchema = z.object({
  name: z.string()
    .min(1, "お名前を入力してください")
    .max(100, "お名前は100文字以内で入力してください"),
  email: z.string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
  category: z.string()
    .min(1, "お問い合わせの種別を選択してください"),
  subject: z.string()
    .min(1, "件名を入力してください")
    .max(200, "件名は200文字以内で入力してください"),
  message: z.string()
    .min(10, "メッセージは10文字以上で入力してください")
    .max(2000, "メッセージは2000文字以内で入力してください")
});

export function getCategoryLabel(category: string): string {
  const categories: Record<string, string> = {
    'technical': '技術的なサポート',
    'usage': '機能の使い方',
    'feature': '新機能のご要望',
    'billing': '料金・プランについて',
    'bug': '不具合の報告',
    'other': 'その他'
  };
  return categories[category] || category;
}