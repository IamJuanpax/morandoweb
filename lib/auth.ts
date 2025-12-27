
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

/**
 * Retrieves the current authenticated user from the database.
 * If the user is not authenticated, returns null.
 * This function integrates Clerk auth with our Prisma DB.
 */
export async function getCurrentUser(): Promise<User | null> {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        return user;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

/**
 * Checks if the current user has the ADMIN role.
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser();
    return user?.role === "ADMIN";
}
