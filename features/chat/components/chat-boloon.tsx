"use client";
import { formatDateKor } from "@/share/lib/utils";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import ChatService from "../api/ChatService";
import { MessageDataProps } from "../model/chat";

const ChatMessage = ({
  roomId,
  setMessages,
  messages,
}: {
  roomId: string;
  setMessages: (messages: MessageDataProps[]) => void;
  messages: MessageDataProps[];
}) => {
  const { data: chatHistory, isLoading: chatHistoryLoading } = useQuery({
    queryKey: ["chatHistory", roomId],
    queryFn: () => ChatService.getChatHistroy(roomId),
    select: (data: any) => data.data,
    enabled: !!roomId,
    staleTime: 1000,
  });

  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory, setMessages]);

  if (chatHistoryLoading) return <div>로딩중</div>;
  if (!chatHistory) return <div>메세지가 존재하지 않습니다.</div>;

  return (
    <>
      {messages?.map((item: MessageDataProps) => {
        return (
          <div key={uuidv4()} className="p-3 hover:bg-[#00000010]">
            {item.type === "JOIN" ? (
              `${item.sender} 님께서 입장하셨습니다.`
            ) : item.type === "INACTIVE" ? (
              `${item.sender}님께서 퇴장하셨습니다.`
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <p className="mr-6 font-bold text-fontSize-title16 text-ST_asist">
                    {item.sender}
                  </p>
                  <div className="text-sm text-ST_placeHolder">
                    {formatDateKor(item.createdDate)}
                  </div>
                </div>
                <div className="font-medium text-title16 text-ST_asist">
                  {item.content}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
export default ChatMessage;
