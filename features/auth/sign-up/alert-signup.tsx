import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/share/ui/alert";
import { Button, buttonVariants } from "../../../share/ui/button";
import { cn } from "@/share/lib/utils";

import useAlert from "@/hooks/useAlert";

function AlertSignUp({ content }: { content: string }) {
  const closeAlertHandle = useAlert((state) => state.closeAlert);
  const { message } = useAlert();

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{content}에 실패하셨습니다.</AlertDescription>
      <AlertDescription>사유 : {message}</AlertDescription>
      <Button
        className={cn(
          buttonVariants({ variant: "destructive", size: "lg" }),
          "mt-10 text-center"
        )}
        onClick={closeAlertHandle}
      >
        확인
      </Button>
    </Alert>
  );
}

export default AlertSignUp;
