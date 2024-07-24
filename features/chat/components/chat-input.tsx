"use client";

import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

import { cn } from "@/share/lib/utils";
import { Input } from "@/share/ui/input";

// import { useStompClient } from "../hooks/useStompClient";

// import useChatMessage from "../hooks/useChatMessage";

// 채팅 메시지 입력 컴포넌트
const ChatInput = ({
  roomId,
  sendChatMessage,
}: {
  roomId: string;
  sendChatMessage: any;
}) => {
  const [message, setMessage] = useState<string>("");

  // const { sendChatMessage, subMessageSocket } = useWebSocket();

  // const chatMessage = useChatMessage((state) => state.addMessage);
  // const stompClient = Stomp.over(new SockJS("http://localhost:8080/ws"));

  // useStompClient();

  // fileUploadService.ts
  // async function uploadFile(file: File): Promise<string> {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // 파일을 경로를 반환해주는 url (react-query 로 변환할 예정)
  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   return data.url; // API에서 파일을 처리하고 URL을 반환하도록 가정
  // }

  const submitSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      const chatMessageData = {
        content: message,
        sender: "song",
        roomId: roomId,
        type: "CHAT",
      };

      sendChatMessage(chatMessageData);

      setMessage("");
    }
  };

  // const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64Url = reader.result as string;
  //       // dispatch(previewUrlData(base64Url)); // 스토어에 미리보기 URL 저장
  //     };
  //     reader.readAsDataURL(file);

  //     // 비동기적으로 파일을 서버에 업로드하고 URL을 저장
  //     const url: any = await uploadFile(file);
  //     //   dispatch(uploadFileUrl(url)); // 서버로부터 받은 URL을 스토어에 저장
  //   }
  // };

  return (
    <form
      onSubmit={submitSendMessage}
      className="relative flex items-center rounded-md pl-2 bg-[#d9d9d9a8]"
    >
      <div className="flex">
        {/* 파일첨부 */}
        <label className="text-ST_placeHolder rounded-2xl cursor-pointer mr-2 hover:text-white  hover:rounded-2xl focus:outline-none">
          <FiPlusCircle className="w-8 h-8" />
          {/* <Input type="file" className="hidden" onChange={onChangeFile} /> */}
        </label>
      </div>

      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메세지 보내기...."
        className={cn(
          "w-full h-10 px-4 border-none focus:outline-none bg-[#d9d9d933]"
        )}
      />

      <div className="absolute top-3 right-6">{/* <Icons.chatSvg /> */}</div>
    </form>
  );
};
export default ChatInput;
