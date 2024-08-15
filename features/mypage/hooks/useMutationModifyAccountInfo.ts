import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import useToggle from "@/hooks/useToggleStore";
import { putModifyInfo } from "../api/ConfigService";

export const useMutationModifyAccountInfo = <T>() => {
  const queryClient = useQueryClient();
  const { toggleFn } = useToggle();

  const mutation = useMutation({
    mutationFn: (data: T) => putModifyInfo(data),
    onSuccess: (data) => {
      console.log("suceess permission data -", data);
      queryClient.invalidateQueries({
        queryKey: ["configAccount"],
      });
      queryClient.invalidateQueries({
        queryKey: ["profileImage"],
      });
      toggleFn();
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return mutation;
};
