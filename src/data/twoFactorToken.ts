import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const deleteTwoFactorTokenByEmail = async (email: string) => {
  try {
    await db.twoFactorToken.deleteMany({
      where: { email },
    });
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async (
  email: string,
  token: string,
  expires: Date,
) => {
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};
