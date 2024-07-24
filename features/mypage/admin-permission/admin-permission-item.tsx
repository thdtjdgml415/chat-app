"use client";

import { cn } from "@/share/lib/utils";
import { Button, buttonVariants } from "@/share/ui/button";

import { useMutationPermissionMember } from "../hooks/useMutationPermissionMember";
import { User } from "../model/myConfig";

export type ActionPorps = {
  id: number;
  state: string;
  companyCode: string;
};

export default function AdminPermissionitem({
  id,
  name,
  loginId,
  birthDate,
  companyCode,
  email,
  gender,
  role,
  state,
  profile,
}: User) {
  const mutation = useMutationPermissionMember();

  const handleAction = (actionType: string, code: string) => {
    // 여기에서 actionType에 따라 다른 API 호출을 수행하거나, 다른 로직을 실행
    if (actionType === "approve") {
      const data: ActionPorps = { id, state: "APPROVED", companyCode: code };
      mutation.mutate(data);
    } else if (actionType === "reject") {
      const data: ActionPorps = { id, state: "DENIED", companyCode: code };
      mutation.mutate(data);
    }
  };

  return (
    <li key={id} className="max-w-80 flex items-center justify-between">
      <p className="min-w-20 mr-10">{name}</p>
      <div className="flex max-sm:flex-wrap">
        <Button
          onClick={() => handleAction("approve", companyCode)}
          className="mr-5 max-sm:mb-2"
        >
          승인
        </Button>
        <Button
          onClick={() => handleAction("reject", companyCode)}
          className={cn(buttonVariants({ variant: "destructive" }))}
        >
          거절
        </Button>
      </div>
    </li>
  );
}
