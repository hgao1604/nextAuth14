import { v4 as uuidv4 } from "uuid";
import {
  getVerificationTokenByEmail,
  deleteVerificationTokenByEmail,
  createVerificationToken,
} from "@/data/verificationToken";

import {
  getPasswordResetTokenByEmail,
  deletePasswordResetTokenByEmail,
  createPasswordResetToken,
} from "@/data/passwordReset";

import {
  getTwoFactorTokenByEmail,
  deleteTwoFactorTokenByEmail,
  createTwoFactorToken,
} from "@/data/twoFactorToken";

import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationTokenByEmail(email);
  }
  const verificationToken = await createVerificationToken(
    email,
    token,
    expires,
  );
  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await deletePasswordResetTokenByEmail(email);
  }
  const passwordResetToken = await createPasswordResetToken(
    email,
    token,
    expires,
  );
  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 999_999).toString(); // 6 digit number
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await deleteTwoFactorTokenByEmail(email);
  }
  const twoFactorToken = await createTwoFactorToken(email, token, expires);
  return twoFactorToken;
};
