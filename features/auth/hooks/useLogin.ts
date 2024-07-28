import AuthService from "@/features/auth/api/AuthService";
import { SuccessLoginData, User } from "@/features/auth/model/auth";
import useAlert from "@/hooks/useAlert";
import Service from "@/share/api/Service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const service = new Service();
  const openAlert = useAlert((state) => state.openAlert);
  const mutation = useMutation({
    mutationFn: (data: User) => AuthService.login(data),
    onSuccess: ({ data }: SuccessLoginData) => {
      console.log("suceess login data -", data);
      if (data) {
        service.setAuthToken(data.tokenInfo.accessToken);
        service.setAuthRefreshToken(data.tokenInfo.refreshToken);
        localStorage.setItem("role", data.role);
        router.push("/chat/chatroom");
      }
    },
    onError: (error: AxiosError<any, any>) => {
      if (error.isAxiosError && error.response) {
        openAlert({
          type: "error",
          title: "로그인 에러",
          message: error?.response?.data.message,
        });
      }
    },
  });

  return mutation;
};
