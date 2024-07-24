import { create } from "zustand";

type Store = {
  isToggle: boolean;

  toggleFn: () => void;
};

const useToggle = create<Store>((set) => ({
  isToggle: false,

  toggleFn: () => set((state) => ({ isToggle: !state.isToggle })),
}));

export default useToggle;
