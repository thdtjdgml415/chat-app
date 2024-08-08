import { Skeleton } from "@/share/ui/skeleton";

import ErrorAlert from "@/share/components/error-alert";
import { useQueryPermissionMember } from "../hooks/useQueryAccount";
import { UserConfig } from "../model/myConfig";
import AdminPermissionitem from "./admin-permission-item";

export default function AdminPermission() {
  const { data, error, isPending, isLoading } = useQueryPermissionMember();

  if (error) return <ErrorAlert error={error} />;
  if (!data || data.data.length === 0)
    return <div className="my-10">유저 목록이 없습니다.</div>;
  if (data) {
    console.log("get permission member list ---", data);
  }
  return (
    <div className="mt-10 max-w-80">
      <h1 className="font-bold min-w-40 text-slate-400">대기중인 명단</h1>
      <hr className="mb-5" />
      {!isLoading ? (
        <ul className="space-y-5 min-w-40">
          {data?.data.map((el: UserConfig) => {
            const {
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
            } = el;
            return (
              <AdminPermissionitem
                key={id}
                id={id}
                name={name}
                loginId={loginId}
                birthDate={birthDate}
                companyCode={companyCode}
                email={email}
                gender={gender}
                role={role}
                state={state}
                profile={profile}
              />
            );
          })}
        </ul>
      ) : (
        <div className="space-y-4 min-w-32 w-80">
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
          <Skeleton className="h-[50px] w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
