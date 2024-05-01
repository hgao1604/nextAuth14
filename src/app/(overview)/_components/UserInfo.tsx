import { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import InfoItem from "./InfoItem";

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <h2 className="text-center text-2xl font-semibold">{label}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoItem label="ID" value={user?.id} />
        <InfoItem label="Name" value={user?.name} />
        <InfoItem label="Email" value={user?.email} />
        <InfoItem label="Role" value={user?.role} />
        <InfoItem
          label="Two Factor Authentication"
          value={user?.isTwoFactorEnabled ? "On" : "Off"}
        />
      </CardContent>
    </Card>
  );
};
export default UserInfo;
