"use client";

import RowList from "@/share/components/RowList";
import { Skeleton } from "@/share/ui/skeleton";
import { useQueryGetChatUserList } from "../hooks/useQueryGetChatUserList";
import { ChatUser } from "../model/chat";

const UserList = () => {
  const { data: list, error, isLoading } = useQueryGetChatUserList();

  if (isLoading)
    return (
      <div className="flex flex-col my-5 space-y-3">
        <Skeleton className="h-[30px] w-[100px] rounded-xl" />
        <Skeleton className="h-[30px] w-[100px] rounded-xl" />
        <Skeleton className="h-[30px] w-[100px] rounded-xl" />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  if (!list || list.length === 0)
    return <div className="my-10">유저 목록이 없습니다.</div>;

  return (
    <>
      {list.map((user: ChatUser) => {
        const {
          id,
          loginId,
          name,
          birthDate,
          gender,
          email,
          role,
          companyCode,
          state,
          profile,
          profileImage,
          isConnected,
        } = user;
        return (
          <RowList
            key={id}
            left={<RowList.isConnect isConnected={isConnected} />}
            content={
              <RowList.hover
                id={id}
                loginId={loginId}
                name={name}
                birthDate={birthDate}
                gender={gender}
                email={email}
                role={role}
                companyCode={companyCode}
                state={state}
                profile={profile}
                profileImage={profileImage}
                isConnected={isConnected}
              />
            }
          />
        );
      })}
    </>
  );
};

export default UserList;
