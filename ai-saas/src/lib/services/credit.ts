import { prisma } from "@/lib/db/prisma";

export class CreditService {
  async consumeCredits(userId: string, amount: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { 
        id: true,
        credits: true, 
        prepaidCredits: true 
      }
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const totalCredits = user.credits + user.prepaidCredits;
    
    if (totalCredits < amount) {
      return false;
    }

    if (user.credits >= amount) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          credits: user.credits - amount
        }
      });
    } else {
      const remainingAmount = amount - user.credits;
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          credits: 0,
          prepaidCredits: user.prepaidCredits - remainingAmount
        }
      });
    }

    return true;
  }

  async getUserCredits(userId: string) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { 
        credits: true, 
        prepaidCredits: true,
        subscriptionStatus: true 
      }
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    return {
      subscriptionCredits: user.credits,
      prepaidCredits: user.prepaidCredits,
      totalCredits: user.credits + user.prepaidCredits,
      subscriptionStatus: user.subscriptionStatus
    };
  }

  async canUseCredits(userId: string, amount: number): Promise<boolean> {
    const credits = await this.getUserCredits(userId);
    return credits.totalCredits >= amount;
  }

  async addPrepaidCredits(userId: string, amount: number): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true }
    });

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        prepaidCredits: {
          increment: amount
        },
        lastCreditRefill: new Date()
      }
    });
  }
}