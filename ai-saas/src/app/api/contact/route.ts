import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, type ContactData } from "@/lib/validations/contact";
import { ContactEmailService } from "@/lib/services/email";
import { NotificationService } from "@/lib/services/notification";

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
  const emailService = new ContactEmailService();
  const notificationService = new NotificationService();
  
  await Promise.allSettled([
    emailService.sendContactEmails(data),
    notificationService.sendAllNotifications(data)
  ]);
}