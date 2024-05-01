"use server";

import { LoginSchema, type LoginSchemaType } from "@/schemas/authSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import {
  getTwoFactorTokenByEmail,
  deleteTwoFactorTokenByEmail,
} from "@/data/twoFactorToken";

import {
  getTwoFactorConfirmationByUserId,
  deleteTwoFactorConfirmationByUserId,
  createTwoFactorConfirmation,
} from "@/data/twoFactorConfirmation";
import { create } from "domain";

export const login = async (
  value: LoginSchemaType,
  callbackUrl?: string | null,
) => {
  const validateFields = LoginSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, code } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);
    return { success: "Confirmation email sent!" };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (!code) {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
    const twoFactorToken = await getTwoFactorTokenByEmail(email);
    if (!twoFactorToken || twoFactorToken.token !== code) {
      return { error: "Invalid two factor code!" };
    }
    const hasExpired = new Date() > new Date(twoFactorToken.expires);
    if (hasExpired) {
      return { error: "Two factor code expired!" };
    }
    await deleteTwoFactorTokenByEmail(email);
    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id,
    );
    if (existingConfirmation) {
      await deleteTwoFactorConfirmationByUserId(existingUser.id);
    }
    await createTwoFactorConfirmation(existingUser.id);
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
