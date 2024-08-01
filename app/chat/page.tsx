"use client";

import useSocketConnect from "@/share/hooks/useSocketConnect";

export default function Chatroom() {
  useSocketConnect();
  return (
    <>
      <div className="min-w-[201px] w-72 h-screen bg-[#F0F0F0] text-white"></div>
    </>
  );
}
