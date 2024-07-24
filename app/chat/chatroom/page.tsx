"use client";

import { useWebSocketStore } from "@/share/store/useWebsocketStore";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/share/ui/resizable";
import ConfigChatRoomSide from "@/widget/chat-config/chatroom-config";
import { ChatRoom } from "@/widget/chat/chat-room";
import { useEffect } from "react";

export default function Page() {
  const { connect, disconnect } = useWebSocketStore();
  useEffect(() => {
    connect();
    console.log("몇번");
    return () => {
      disconnect();
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full border-r-2 "
    >
      <ResizablePanel defaultSize={20} className="min-w-[201px] bg-secondary">
        {/* 설정 및 유저 상태 */}
        <ConfigChatRoomSide />
      </ResizablePanel>
      <ResizableHandle className="bg-[#cccccc]" />
      <ResizablePanel className="min-w-[500px]">
        {/* 채팅방 */}
        <ChatRoom />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
