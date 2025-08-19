import { type ContactData, getCategoryLabel } from "@/lib/validations/contact";

export class NotificationService {
  async sendAllNotifications(data: ContactData): Promise<void> {
    const content = this.createNotificationContent(data);
    const notifications = [];

    if (process.env.DISCORD_WEBHOOK_URL) {
      notifications.push(this.sendDiscordNotification(content));
    }

    if (process.env.SLACK_WEBHOOK_URL) {
      notifications.push(this.sendSlackNotification(content));
    }

    if (process.env.LINE_NOTIFY_TOKEN) {
      notifications.push(this.sendLineNotification(content));
    }

    if (notifications.length > 0) {
      await Promise.allSettled(notifications);
    }
  }

  private createNotificationContent(data: ContactData): string {
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

  private async sendDiscordNotification(content: string): Promise<Response | null> {
    return fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**新しいお問い合わせ**\n\`\`\`\n${content}\n\`\`\``
      })
    }).catch(() => null);
  }

  private async sendSlackNotification(content: string): Promise<Response | null> {
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

  private async sendLineNotification(content: string): Promise<Response | null> {
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
}