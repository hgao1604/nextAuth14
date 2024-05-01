import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const updateUserPassword = async (email: string, password: string) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return true;
  } catch {
    return false;
  }
};
