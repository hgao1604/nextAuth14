"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Heading from "@/components/auth/Heading";
import Social from "@/components/auth/Social";
import BackButton from "@/components/auth/BackButton";

type CardWrapperProps = {
  children: React.ReactNode;
  headLabel: string;
  backLabel: string;
  backLink: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  children,
  headLabel,
  backLabel,
  backLink,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Heading title="🔐 Auth" description={headLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton backLabel={backLabel} backLink={backLink} />
      </CardFooter>
    </Card>
  );
};
export default CardWrapper;
