"server-only"

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getUserCredits() {
    try {
        const user = await currentUser();
        if (!user) {
            return 0;
        }
        const dbUser = await prisma.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                credits: true,
            },
        });
        return dbUser?.credits ?? 0;
    } catch (error) {
        console.error("Error fetching user credits:", error);
        return 0;
    }
}

export async function decrementCredits(clerkId: string, amount: number = 1) {
    try {
        const user = await prisma.user.update({
            where: {
                clerkId: clerkId,
            },
            data: {
                credits: {
                    decrement: amount,
                },
            },
            select: {
                credits: true,
            }
        });
        return user?.credits ?? 0;
    } catch (error) {
        console.error("Error decrementing user credits:", error);
        throw new Error("Failed to update credits");
    }
}