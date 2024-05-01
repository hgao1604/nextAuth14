"use server";

import { isAuthorized } from "@/lib/auth";

export const authorizeAction = async () => {
  const authorized = await isAuthorized(["ADMIN"]);
  if (!authorized) {
    return { error: "Unauthorized" };
  }
  return { success: "Authorized" };
};
