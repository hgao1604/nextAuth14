import { CheckCircle } from "lucide-react";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-400/15 p-3 text-sm text-green-400">
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
export default FormSuccess;
