"use client";

import useToggle from "@/hooks/useToggle";
import ToggleListBtn from "@/share/atom-components/toggle-list-button";
import CustomDropdownMenu from "@/share/components/custom-dropdown-menu";
import Flex from "@/share/components/Layout/Flex";

import { roomTypeProp } from "@/share/store/useCreateChatRoomModalStore";
import { ChatRoomList } from "./chatroom-list";

export interface createRoomListProps {
  id: number;
  roomType: roomTypeProp;
  name: string;
}

export default function ChatRoomMenu() {
  const [isToggle, setIsToggle] = useToggle();

  return (
    <>
      <Flex>
        <ToggleListBtn
          toggleFn={setIsToggle}
          state={isToggle}
          label={"채팅방 목록"}
        />
        <CustomDropdownMenu />
      </Flex>
      {isToggle && <ChatRoomList />}
    </>
  );
}
