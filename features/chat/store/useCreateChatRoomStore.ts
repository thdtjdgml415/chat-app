import { create } from "zustand";
import { Room } from "../model/chat";

interface ChatRoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

const useChatRoomStore = create<ChatRoomState>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));

export default useChatRoomStore;
