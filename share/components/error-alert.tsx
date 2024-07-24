import { AxiosError } from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ErrorAlertProps {
  error: Error | AxiosError;
}

export default function ErrorAlert({ error }: any) {
  console.log(error);
  return (
    <div className="mt-16 max-w-80">
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    </div>
  );
}
