"use client";

import CreateRoomModal from "@/features/chat/components/create-room-modal";
import useToggle from "@/hooks/useToggle";
import ToggleListBtn from "@/share/atom-components/toggle-list-button";
import CustomDropdownMenu from "@/share/components/custom-dropdown-menu";
import { ChatRoomList } from "./chatroom-list";

export interface createRoomListProps {
  id: number;
  roomType: string;
  name: string;
}

let createRoomList: createRoomListProps[] = [
  { id: 1, roomType: "PRIVATE", name: "일반채팅" },
  { id: 2, roomType: "GROUP", name: "그룹채팅" },
];

export default function ChatRoomMenu() {
  const [isToggle, setIsToggle] = useToggle();

  return (
    <>
      <div className="flex">
        <ToggleListBtn
          toggleFn={setIsToggle}
          state={isToggle}
          label={"채팅방 목록"}
        />
        <CustomDropdownMenu createRoomList={createRoomList} />
      </div>
      <CreateRoomModal />
      {isToggle && <ChatRoomList />}
    </>
  );
}
