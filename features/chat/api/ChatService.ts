import Service from "@/share/api/Service";
import { ChatRoomProps, ChatUserListProps, Room } from "../model/chat";
import axios from "axios";

// process.env.NEXT_PUBLIC_API_BASE_URL + "/api/chat/rooms",
// {
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Credenials": true,
//     "ngrok-skip-browser-warning": true,
//     Bearer: token,
//   },
// }

class ChatService extends Service {
  // 채팅방 리스트
  async getChatRoomList(): Promise<ChatRoomProps> {
    const response = await this.get<ChatRoomProps>("/api/chat/rooms");
    return response;
  }
  // 채팅방 전체 가능한 유저 리스트
  async getChatUserList(): Promise<ChatUserListProps> {
    const response = await this.get<ChatUserListProps>("/api/member/colleague");
    return response;
  }

  async getChatHistroy(data: string | null) {
    if (data) {
      const roomId = { roomId: data };
      const response = await this.get("/api/chat/history", roomId);
      return response;
    }
  }
}

export default new ChatService();
