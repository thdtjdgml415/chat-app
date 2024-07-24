import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfigService from "../api/ConfigService";
import { ActionPorps } from "../admin-permission/admin-permission-item";

export const useMutationPermissionMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ActionPorps) => ConfigService.postPermissionMember(data),
    onSuccess: (data) => {
      console.log("suceess permission data -", data);
      queryClient.invalidateQueries({ queryKey: ["permissionList"] });
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return mutation;
};
