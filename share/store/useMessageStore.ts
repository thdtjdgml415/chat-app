import { MessageDataProps } from "@/features/chat/model/chat";
import { create } from "zustand";

interface MessageStore {
  messages: MessageDataProps[];
  addMessage: (message: MessageDataProps) => void;
  setMessages: (messages: MessageDataProps[]) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),
}));
export default useMessageStore;
