import { get } from "@/share/api/Service";
import { AxiosResponse } from "axios";

type chatHistoryProps = {
  content: null | string;
  createdDate: string;
  id: number;
  image: null;
  sender: string;
  type: string;
};

export async function fetchChatRooms() {
  const response = await get("/api/chat/rooms");
  return response;
}

export async function fetchChatHistory(roomId: string) {
  const response: AxiosResponse = await get(
    `/api/chat/history?roomId=${roomId}`
  );
  const data: chatHistoryProps = response.data;
  console.log("chatHistory", data);
  return data;
}

export async function fetchChatUserList() {
  const response = await get("/api/member/colleague");
  console.log(response);
  return response;
}
