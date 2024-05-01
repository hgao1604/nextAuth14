import { db } from "@/lib/db";
import email from "next-auth/providers/email";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch {
    return null;
  }
};

export const deletePasswordResetTokenByEmail = async (email: string) => {
  try {
    await db.passwordResetToken.deleteMany({
      where: { email },
    });
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
