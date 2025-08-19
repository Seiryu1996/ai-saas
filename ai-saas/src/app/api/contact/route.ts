import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from 'resend';

type ContactData = {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
};

const contactSchema = z.object({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    await processContactRequest(validatedData);

    return NextResponse.json({ 
      success: true, 
      message: "お問い合わせを受け付けました。お返事まで1-3営業日お待ちください。" 
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "入力内容に不備があります", 
          errors: error.issues.map(err => ({
            path: err.path,
            message: err.message,
            code: err.code
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: "送信中にエラーが発生しました。しばらく後でお試しください。"
      },
      { status: 500 }
    );
  }
}

async function processContactRequest(data: ContactData) {
  const emailContent = createEmailContent(data);
  
  await sendContactEmail(data);
  await sendNotifications(emailContent);
}

function createEmailContent(data: ContactData): string {
  return `お問い合わせを受信しました。

■ 基本情報
お名前: ${data.name}
メールアドレス: ${data.email}
お問い合わせ種別: ${getCategoryLabel(data.category)}
件名: ${data.subject}

■ メッセージ
${data.message}

---
AI Creator お問い合わせシステム
送信日時: ${new Date().toLocaleString('ja-JP')}`;
}

async function sendNotifications(content: string) {
  const notifications = [];

  if (process.env.DISCORD_WEBHOOK_URL) {
    notifications.push(sendDiscordNotification(content));
  }

  if (process.env.SLACK_WEBHOOK_URL) {
    notifications.push(sendSlackNotification(content));
  }

  if (process.env.LINE_NOTIFY_TOKEN) {
    notifications.push(sendLineNotification(content));
  }

  if (notifications.length > 0) {
    await Promise.allSettled(notifications);
  }
}

async function sendDiscordNotification(content: string) {
  return fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `**新しいお問い合わせ**\n\`\`\`\n${content}\n\`\`\``
    })
  }).catch(() => null);
}

async function sendSlackNotification(content: string) {
  return fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `新しいお問い合わせ`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*新しいお問い合わせ*\n\`\`\`${content}\`\`\``
          }
        }
      ]
    })
  }).catch(() => null);
}

async function sendLineNotification(content: string) {
  const params = new URLSearchParams();
  params.append('message', `新しいお問い合わせ\n\n${content}`);
  
  return fetch('https://notify-api.line.me/api/notify', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  }).catch(() => null);
}

function getCategoryLabel(category: string): string {
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

async function sendContactEmail(data: ContactData) {
  if (!isEmailConfigured()) {
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await sendAdminNotificationEmail(resend, data);
    
    if (process.env.SEND_AUTO_REPLY === 'true') {
      await sendAutoReplyEmail(resend, data);
    }

  } catch (error) {
    // No process
  }
}

function isEmailConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.EMAIL_TO);
}

async function sendAdminNotificationEmail(resend: Resend, data: ContactData) {
  const mailContent = createAdminEmailContent(data);
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [process.env.EMAIL_TO!],
    subject: `[AI Creator] お問い合わせ: ${data.subject}`,
    text: mailContent,
    replyTo: data.email,
  });
}

async function sendAutoReplyEmail(resend: Resend, data: ContactData) {
  const autoReplyContent = createAutoReplyContent(data);
  
  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: [data.email],
    subject: `[AI Creator] お問い合わせを受け付けました - ${data.subject}`,
    text: autoReplyContent,
  });
}

function createAdminEmailContent(data: ContactData): string {
  return `新しいお問い合わせを受信しました。

■ 基本情報
・お名前: ${data.name}
・メールアドレス: ${data.email}
・お問い合わせ種別: ${getCategoryLabel(data.category)}
・件名: ${data.subject}

■ メッセージ
${data.message}

---
AI Creator お問い合わせシステム
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`;
}

function createAutoReplyContent(data: ContactData): string {
  return `${data.name} 様

この度は、AI Creatorにお問い合わせいただき、誠にありがとうございます。

お問い合わせ内容を確認いたしました。
通常1-3営業日以内にご返信いたします。お急ぎの場合は、件名に【緊急】とご記載ください。

■ お問い合わせ内容
件名: ${data.subject}
お問い合わせ種別: ${getCategoryLabel(data.category)}

※ このメールは自動送信です。このメールに返信いただいても対応できません。
  ご不明点がございましたら、改めてお問い合わせフォームをご利用ください。

AI Creator サポートチーム`;
}