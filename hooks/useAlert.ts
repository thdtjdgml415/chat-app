import { create } from "zustand";

type Store = {
  isOpen: boolean;
  message: string;
  openAlert: (message: string) => void;
  closeAlert: () => void;
};

const useAlert = create<Store>((set) => ({
  isOpen: false,
  message: "",
  openAlert: (message: string) => set({ message: message, isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}));

export default useAlert;
