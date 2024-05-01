import { getCurrentUser } from "@/lib/auth";
import UserInfo from "../_components/UserInfo";

const ServerPage = async () => {
  const user = await getCurrentUser();
  return <UserInfo user={user} label="Server Component" />;
};
export default ServerPage;
