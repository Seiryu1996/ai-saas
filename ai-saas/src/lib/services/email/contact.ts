import { BaseEmailService, type EmailConfig } from './base';
import { getCategoryLabel, type ContactData } from "@/lib/validations/contact";

export class ContactEmailService extends BaseEmailService {
  async sendContactEmails(data: ContactData): Promise<void> {
    if (!this.isEmailConfigured()) {
      return;
    }

    try {
      await this.sendAdminNotificationEmail(data);
      
      if (process.env.SEND_AUTO_REPLY === 'true') {
        await this.sendAutoReplyEmail(data);
      }
    } catch (error) {
      console.log("Email Send Error：", error);
    }
  }

  private async sendAdminNotificationEmail(data: ContactData): Promise<void> {
    const config: EmailConfig = {
      from: process.env.EMAIL_FROM!,
      to: [process.env.EMAIL_TO!],
      subject: `[AI Creator] お問い合わせ: ${data.subject}`,
      text: this.createAdminEmailContent(data),
      replyTo: data.email,
    };
    
    await this.sendEmail(config);
  }

  private async sendAutoReplyEmail(data: ContactData): Promise<void> {
    const config: EmailConfig = {
      from: process.env.EMAIL_FROM!,
      to: [data.email],
      subject: `[AI Creator] お問い合わせを受け付けました - ${data.subject}`,
      text: this.createAutoReplyContent(data),
    };
    
    await this.sendEmail(config);
  }

  private createAdminEmailContent(data: ContactData): string {
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
送信日時: ${this.formatDate()}`;
  }

  private createAutoReplyContent(data: ContactData): string {
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
}