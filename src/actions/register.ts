"use server";

import { RegisterSchema, type RegisterSchemaType } from "@/schemas/authSchema";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (value: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, name } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use" };
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  //TODO: send email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
