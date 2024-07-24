"use client";

import useChatroomStateStore from "@/share/store/useChatroomStateStore";
import Image from "next/image";
import ChattingBox from "./chatting-box";

export function ChatRoom() {
  const { isOpen, setOpenChat } = useChatroomStateStore();

  return (
    <div className="w-full h-full relative bg-secondary">
      {isOpen === true ? (
        <>
          <button
            className="absolute right-5 bg-[#cccc]"
            onClick={() => {
              setOpenChat(false);
            }}
          >
            Close
          </button>
          <ChattingBox />
        </>
      ) : (
        <div className="w-full h-full flex justify-center pt-80">
          <div>
            <Image
              src="/images/choiceChat-Photoroom.png"
              width={150}
              height={150}
              alt="채팅방을 선택해주세요!"
            />
            <p className="text-menu">채팅방을 선택해주세요....!!</p>
          </div>
        </div>
      )}
    </div>
  );
}
