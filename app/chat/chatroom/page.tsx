"use client";
import useSocketConnect from "@/share/hooks/useSocketConnect";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/share/ui/resizable";
import ConfigChatRoomSide from "@/widget/chat-config/chatroom-config";
import { ChatRoom } from "@/widget/chat/chat-room";

export default function Page() {
  useSocketConnect();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full border-r-2 "
    >
      <ResizablePanel defaultSize={20} className="min-w-[200px]">
        {/* 설정 및 유저 상태 */}
        <ConfigChatRoomSide />
      </ResizablePanel>
      <ResizableHandle className="bg-[#cccccc]" />
      <ResizablePanel defaultSize={80}>
        {/* 채팅방 */}
        <ChatRoom />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
