// PopupAlert.tsx
import useAlert from "@/hooks/useAlert";
import { cn } from "@/share/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/share/ui/alert";
import { Button, buttonVariants } from "@/share/ui/button";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import React from "react";

type AlertType = "success" | "error" | "warning" | "info";

interface PopupProps {
  type: AlertType;
  title: string;
  message: string;
}

const alertIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const PopupAlert: React.FC = () => {
  const { type, message, title, closeAlert } = useAlert();

  const Icon = alertIcons[type];

  return (
    <Alert
      variant={"destructive"}
      className="w-full border-red-600 border-solid"
    >
      <Icon className="w-4 h-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <Button
        className={cn(
          buttonVariants({ variant: "destructive", size: "lg" }),
          "mt-10 text-center"
        )}
        onClick={closeAlert}
      >
        확인
      </Button>
    </Alert>
  );
};

export default PopupAlert;
