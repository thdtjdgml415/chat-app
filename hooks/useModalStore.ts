import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  name?: string;
  roomType?: string;
  setOpen: (data: { name: string; roomType: string; isOpen: boolean }) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  name: "",
  roomType: "",
  setOpen: ({ name, roomType, isOpen }) => set({ isOpen, name, roomType }),
}));
export default useModalStore;
