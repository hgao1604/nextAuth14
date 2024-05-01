"use client";

import UserInfo from "../_components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo user={user} label="Client Component" />;
};
export default ClientPage;
