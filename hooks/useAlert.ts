import { create } from "zustand";

type AlertType = "success" | "error" | "warning" | "info";

type Store = {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
  openAlert: ({
    type,
    title,
    message,
  }: {
    type: AlertType;
    title: string;
    message: string;
  }) => void;
  closeAlert: () => void;
};

const useAlert = create<Store>((set) => ({
  isOpen: false,
  type: "info",
  title: "",
  message: "",
  openAlert: ({ type, title, message }) =>
    set({ type, title, message, isOpen: true }),
  closeAlert: () => set({ isOpen: false }),
}));

export default useAlert;
