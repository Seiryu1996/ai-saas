import { Resend } from 'resend';
import React, { type ReactElement } from 'react';

export interface EmailConfig {
  from: string;
  to: string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  react?: ReactElement;
}

export abstract class BaseEmailService {
  protected resend: Resend;

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  protected async sendEmail(config: EmailConfig): Promise<void> {
    await this.resend.emails.send({
      from: config.from,
      to: config.to,
      subject: config.subject,
      replyTo: config.replyTo,
      html: config.html,
      text: config.text,
      react: config.react,
    });
  }

  protected isEmailConfigured(): boolean {
    return !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM && process.env.EMAIL_TO);
  }

  protected formatDate(): string {
    return new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  }
}