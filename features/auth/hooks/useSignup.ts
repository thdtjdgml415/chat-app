import AuthService from "@/features/auth/api/AuthService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import useAlert from "../../../hooks/useAlert";

export const useSignUp = <T>() => {
  const router = useRouter();
  const openAlert = useAlert((state) => state.openAlert); // 알림 창을 열기 위한 상태
  const mutation = useMutation({
    mutationFn: (data: T) => AuthService.postSignUp<T>(data),
    onSuccess: (data: T) => {
      console.log("success sign up data -", data);
      router.push("/sign-in");
    },
    onError: (error: AxiosError<any, any>) => {
      if (error.isAxiosError && error.response) {
        openAlert({
          type: "error",
          title: "회원가입 에러",
          message: error?.response?.data.message,
        });
      }
      console.error("Signup error:", error);
    },
  });

  return mutation;
};
