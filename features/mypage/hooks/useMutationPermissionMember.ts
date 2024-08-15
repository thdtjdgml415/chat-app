import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ActionPorps } from "../admin-permission/admin-permission-item";
import { postPermissionMember } from "../api/ConfigService";

export const useMutationPermissionMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: ActionPorps) => postPermissionMember(data),
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
