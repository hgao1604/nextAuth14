import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const getCurrentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};

export const isAuthorized = async (allowedRoles: string[]) => {
  const role = await getCurrentRole();
  const isAuthorized =
    allowedRoles.length === 0 || (role && allowedRoles.includes(role));
  return isAuthorized;
};
