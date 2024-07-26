import { Room } from "@/features/chat/model/chat";
import useChatroomStateStore from "@/share/store/useChatroomStateStore";
import useRoomIdStore from "@/share/store/useRoomIdStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import Flex from "../Layout/Flex";
import Text from "../Text/Text";

function ContextMenuList({ roomId, title, loginId, unreadMsgNumber }: Room) {
  const { roomId: currentRoomId, setRoomId } = useRoomIdStore();

  const { setOpenChat } = useChatroomStateStore();
  const handleOpenChat = () => {
    setRoomId(roomId);
    setOpenChat(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          key={roomId}
          data-name={roomId}
          className={`p-2 list-none  ${
            currentRoomId === roomId ? "bg-[#00000010]" : "hover:bg-[#00000010]"
          }`}
          onClick={handleOpenChat}
        >
          <Flex justify="justify-between" alignItems="items-center">
            <Flex direction="flex-col">
              <Text size="t6" weight="xl" color="black" className="mb-2">
                {title ? title : "제목없음"}
              </Text>

              <Text size="t7" weight="s" color="grey">
                dsadasda
              </Text>
            </Flex>
            <Flex direction="flex-col">
              <Text size="t7" weight="s" color="grey">
                {loginId}
              </Text>
              <span className="w-4 h-4 text-center rounded-3xl bg-red-500 text-xs text-[#ffffff]">
                {unreadMsgNumber}
              </span>
            </Flex>
          </Flex>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="z-auto">
        <ContextMenuItem
          className="bg-[#ffffff] w-20 text-red-600 rounded-md text-center border-2 hover:bg-[#cccccc]"
          onClick={() => {
            console.log(roomId);
          }}
        >
          나가기
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
export default ContextMenuList;
