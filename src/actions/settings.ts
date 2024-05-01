"use server";

import { SettingsSchema, type SettingsSchemaType } from "@/schemas/authSchema";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { unstable_update } from "@/auth";

export const settings = async (values: SettingsSchemaType) => {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already exists" };
    }

    const verficationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(values.email, verficationToken.token);
    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  await unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    },
  });

  return { success: "Settings updated" };
};
