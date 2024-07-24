import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface MenuState {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const useMenuStore = create(
  persist<MenuState>(
    (set) => ({
      activeMenu: "/chat/chatroom",
      setActiveMenu: (menu) => set({ activeMenu: menu }),
    }),
    {
      name: "active-menu-storage", // 저장될 localStorage의 키 이름
      storage: createJSONStorage(() => localStorage), // (optional)이기 때문에 해당 줄을 적지 않으면 'localStorage'가 기본 저장소로 사용된다.
    }
  )
);

export default useMenuStore;
