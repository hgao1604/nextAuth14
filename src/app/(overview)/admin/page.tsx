"use client";
import FormSuccess from "@/components/FormSuccess";
import RoleGate from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { toast } from "sonner";
import { authorizeAction } from "@/actions/admin";

const AdminPage = () => {
  const role = useCurrentRole();
  const onApiRouteClick = async () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route");
      } else {
        toast.error("Forbidden API Route");
      }
    });
  };
  const onServerActionClick = async () => {
    const res = await authorizeAction();
    if (res.error) {
      toast.error("Unauthorized Server Action");
    } else {
      toast.success("Authorized Server Action");
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">🧑‍💼 Admin</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <RoleGate allowedRoles={["ADMIN"]}>
          <FormSuccess
            message={`You are allowed to see the content with ${role} role!`}
          />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
