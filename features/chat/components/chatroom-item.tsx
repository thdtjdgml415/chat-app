import { Room } from "@/features/chat/model/chat";
import useChatroomStateStore from "@/share/store/useChatroomStateStore";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";

const ChatRoomItem = ({
  roomId,
  title,
  loginId,
  unreadMsgNumber,
  // subMessageSocket,
  currentRoomId,
  setRoomId,
}: Room) => {
  const { setOpenChat } = useChatroomStateStore();
  const handleOpenChat = () => {
    setRoomId(roomId);
    setOpenChat(true);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li
          key={roomId}
          data-name={roomId}
          className={`p-2 list-none  ${
            currentRoomId === roomId ? "bg-[#00000010]" : "hover:bg-[#00000010]"
          }`}
          onClick={handleOpenChat}
        >
          <div className="flex items-center justify-between">
            <div>
              {title ? <p className="mb-2">{title}</p> : <p>[제목없음]</p>}
              <p className="text-xs text-menu">dsadasda</p>
            </div>
            <div>
              <p className="text-xs text-[#9f9f9f]">{loginId}</p>
              <p className="inline text-right px-1 rounded-3xl bg-red-500 text-xs text-[#ffffff]">
                {unreadMsgNumber}
              </p>
            </div>
          </div>
        </li>
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
};

export default ChatRoomItem;
