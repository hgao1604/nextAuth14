import Heading from "@/components/auth/Heading";
import BackButton from "./BackButton";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Heading title="🔐 Auth" description="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton backLabel="Back to login" backLink="/auth/login" />
      </CardFooter>
    </Card>
  );
};
export default ErrorCard;
