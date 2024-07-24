import { create } from "zustand";

interface ClientStore {
  roomId: string;
  setRoomId: (roomId: string) => void;
}

const useRoomIdStore = create<ClientStore>((set) => ({
  roomId: "",
  setRoomId: (roomId: string) => set({ roomId }),
}));

export default useRoomIdStore;
