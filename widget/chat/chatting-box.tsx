import { ChatInput, ChatMessage } from "@/features/chat";
import useScrollBottom from "@/features/chat/hooks/useScrollBottom";
import useMessageStore from "@/share/store/useMessageStore";
// import useWebSocket from "@/share/hooks/useWebsocket";
import useRoomIdStore from "@/share/store/useRoomIdStore";
import { useWebSocketStore } from "@/share/store/useWebsocketStore";
import { useEffect, useRef } from "react";

export default function ChattingBox() {
  const { roomId } = useRoomIdStore();
  const { messages, setMessages } = useMessageStore();
  const { subscribeToRoom, unsubscribeFromRoom, sendMessage } =
    useWebSocketStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useScrollBottom({ messagesEndRef, messages });

  useEffect(() => {
    subscribeToRoom(roomId);
    console.log(roomId, " 채팅방 구독");

    return () => {
      unsubscribeFromRoom();
      console.log(roomId, " 채팅방 해지");
    };
  }, [roomId, subscribeToRoom, unsubscribeFromRoom]);

  return (
    <div className="w-full h-screen bg-ST_primary box-border">
      <div className="w-full h-[90%] flex flex-col justify-end">
        <div className="flex flex-col overflow-y-auto">
          <ChatMessage
            roomId={roomId}
            setMessages={setMessages}
            messages={messages}
          />
          <div ref={messagesEndRef} />
        </div>
        {/* <PreviewImage /> */}
      </div>
      <div className="w-full  px-10 bg-secondary">
        <div className="pt-5">
          <ChatInput roomId={roomId} sendChatMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
