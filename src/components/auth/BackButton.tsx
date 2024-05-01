import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  backLabel: string;
  backLink: string;
};

const BackButton = ({ backLabel, backLink }: BackButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={backLink}>{backLabel}</Link>
    </Button>
  );
};
export default BackButton;
