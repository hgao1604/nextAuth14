"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  console.log(existingToken);
  if (!existingToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token expired" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.deleteMany({
    where: {
      email: existingToken.email,
    },
  });

  return { success: "Email verified" };
};
