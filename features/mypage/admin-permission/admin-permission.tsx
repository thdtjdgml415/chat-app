import { Skeleton } from "@/share/ui/skeleton";

import { User } from "../model/myConfig";
import AdminPermissionitem from "./admin-permission-item";
import { useQueryPermissionMember } from "../hooks/useQueryAccount";
import ErrorAlert from "@/share/components/error-alert";

export default function AdminPermission() {
  const { data, error, isPending, isLoading } = useQueryPermissionMember();

  if (error) return <ErrorAlert error={error} />;
  if (!data || data.data.length === 0)
    return <div className="my-10">유저 목록이 없습니다.</div>;
  if (data) {
    console.log("get permission member list ---", data);
  }
  return (
    <div className="max-w-80 mt-10">
      <h1 className="min-w-40 text-slate-400 font-bold">대기중인 명단</h1>
      <hr className="mb-5" />
      {!isLoading ? (
        <ul className="min-w-40 space-y-5">
          {data?.data.map((el: User) => {
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
        <div className="min-w-32 w-80 space-y-4">
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
