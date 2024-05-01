import z from "zod";
import { UserRole } from "prisma/prisma-client";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
  // Two factor, 6 digit code
  code: z.string().optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(6, { message: "Minimum 6 Characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
});

export type ResetSchemaType = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 Characters required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Minimum 6 Characters required" }),
});

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]).optional(),
    email: z.string().email({ message: "Email is invalid" }).optional(),
    password: z
      .string()
      .min(6, { message: "Minimum 6 Characters required" })
      .optional(),
    newPassword: z
      .string()
      .min(6, { message: "Minimum 6 Characters required" })
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "Password is required" },
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New Password is required" },
  );

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
