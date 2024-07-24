import { create } from "zustand";

interface ChatStateStore {
  isOpen: boolean;
  setOpenChat: (open: boolean) => void;
}

const useChatroomStateStore = create<ChatStateStore>((set) => ({
  isOpen: false,
  setOpenChat: (open: boolean) => set({ isOpen: open }),
}));

export default useChatroomStateStore;
