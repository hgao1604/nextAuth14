import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const deleteTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    await db.twoFactorConfirmation.delete({
      where: { userId },
    });
  } catch {
    return null;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    await db.twoFactorConfirmation.create({
      data: {
        userId,
      },
    });
  } catch {
    return null;
  }
};
