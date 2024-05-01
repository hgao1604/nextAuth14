"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import FormError from "../FormError";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
  const role = useCurrentRole();
  if (!role || !allowedRoles.includes(role)) {
    return <FormError message="You are not authorized to view this page" />;
  }

  return <>{children}</>;
};
export default RoleGate;
