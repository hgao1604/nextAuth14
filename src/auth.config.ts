import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema, type LoginSchemaType } from "./schemas/authSchema";
import { getUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const isValid = await bcryptjs.compare(password, user.password);
          if (isValid) {
            return user;
          }
        }
        return null;
      },
    }),
    Github,
    Google,
  ],
} satisfies NextAuthConfig;
