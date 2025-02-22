'use server'

import { db } from "@/server/db";

interface EditableUserInfo {
  name: string | null;
  email: string | null;
  dob: Date | null;
  educationalStatus: string | null;
}

export async function getUserProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
        dob: true,
        educationalStatus: true,
        testScores: {
          orderBy: { timestamp: 'desc' },
          take: 3,
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function updateUserProfile(userId: string, data: EditableUserInfo) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: data,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
} 