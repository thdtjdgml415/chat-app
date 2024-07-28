"use client";

import { useQueryGetChatRoomList } from "@/features/chat/hooks/useQueryGetChatRoomList";
import { Room } from "@/features/chat/model/chat";
import RowList from "@/share/components/RowList";
import { Skeleton } from "@/share/ui/skeleton";

export const ChatRoomList = () => {
  const { data: roomData, error, isLoading } = useQueryGetChatRoomList();
  if (isLoading)
    return (
      <div className="flex flex-col my-5 space-y-3">
        <Skeleton className="h-[50px] w-[150px] rounded-xl" />
        <Skeleton className="h-[50px] w-[150px] rounded-xl" />
        <Skeleton className="h-[50px] w-[150px] rounded-xl" />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  if (!roomData || roomData.data.length === 0)
    return <div className="my-10">채팅방 목록이 없습니다.</div>;

  return (
    <ul className="w-full overflow-y-auto h-72">
      {roomData.data.map((room: Room) => {
        const {
          roomId,
          title,
          roomType,
          loginId,
          lastMessage,
          unreadMsgNumber,
        } = room;
        return (
          <RowList
            as="li"
            key={roomId}
            className=""
            content={
              <RowList.context
                key={roomId}
                roomId={roomId}
                title={title}
                roomType={roomType}
                loginId={loginId}
                lastMessage={lastMessage}
                unreadMsgNumber={unreadMsgNumber}
              />
            }
          />
        );
      })}
    </ul>
  );
};
