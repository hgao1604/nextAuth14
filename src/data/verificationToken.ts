import { db } from "@/lib/db";

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
}

export async function deleteVerificationTokenByEmail(email: string) {
  try {
    await db.verificationToken.deleteMany({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
}

export async function createVerificationToken(
  email: string,
  token: string,
  expires: Date,
) {
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
}
