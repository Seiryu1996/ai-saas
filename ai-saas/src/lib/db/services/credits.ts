"server-only"

import { prisma } from "../prisma";
import { CREDITS } from "@/config/credits";
import { getUser } from "@/utils/utils";

export async function getUserCredits() {
    try {
        const result = await getUser(false, { credits: true });
        
        if ('error' in result) {
            return 0;
        }

        return result.dbUser?.credits ?? 0;
    } catch (error) {
        console.error("Error fetching user credits:", error);
        return 0;
    }
}

export async function decrementCredits(
    clerkId: string,
    amount: number = CREDITS.IMAGE_GENERATOR
) {
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