import { createRoomListProps } from "@/features/chat/components/chatroom-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/share/ui/dropdown-menu";

import { CiMenuKebab } from "react-icons/ci";
import { useModalStore } from "../store/useModalStore";
import ModalContainer from "./Modal/ModalContainer";

let createRoomList: createRoomListProps[] = [
  { id: 1, roomType: "PRIVATE", name: "일반채팅" },
  { id: 2, roomType: "GROUP", name: "그룹채팅" },
];

export default function CustomDropdownMenu() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CiMenuKebab />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {createRoomList.map((item) => {
          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() =>
                openModal({
                  componentTit: (
                    <ModalContainer.CreateRoomTitle name={item.name} />
                  ),
                  componentCont: <ModalContainer.CreateRoomCont />,
                  componentFooter: (
                    <ModalContainer.CreateRooomButton
                      roomType={item.roomType}
                    />
                  ),
                })
              }
            >
              {item.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
