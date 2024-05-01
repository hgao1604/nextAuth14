"use server";

import { ResetSchema, type ResetSchemaType } from "@/schemas/authSchema";
import { getUserByEmail, updateUserPassword } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
import {
  NewPasswordSchema,
  type NewPasswordSchemaType,
} from "@/schemas/authSchema";
import { getPasswordResetTokenByToken } from "@/data/passwordReset";
import { deletePasswordResetTokenByEmail } from "@/data/passwordReset";

export const reset = async (data: ResetSchemaType) => {
  const validatedFields = ResetSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }
  const email = data.email;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  // Send reset email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, passwordResetToken.token);
  return { success: "Reset email sent" };
};

export const newPassword = async (
  data: NewPasswordSchemaType,
  token: string | null,
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validatedFields = NewPasswordSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { password, confirmPassword } = data;
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }
  const passwordResetToken = await getPasswordResetTokenByToken(token);
  if (!passwordResetToken) {
    return { error: "Invalid token" };
  }

  const hasExpired = new Date() > new Date(passwordResetToken.expires);

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const email = passwordResetToken.email;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  // Update password
  const isUpdated = await updateUserPassword(email, password);
  if (!isUpdated) {
    return { error: "Error updating password" };
  }
  await deletePasswordResetTokenByEmail(email);

  return { success: "Password updated" };
};
