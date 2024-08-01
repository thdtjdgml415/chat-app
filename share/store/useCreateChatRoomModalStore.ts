import { UserConfig } from "@/features/mypage/model/myConfig";

import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { useWebSocketStore } from "./useWebsocketStore";

export type roomTypeProp = "PRIVATE" | "GROUP" | "";

interface CreateChatRoomModalStoreProps {
  chatName: string;
  roomType: roomTypeProp;
  checkList: Map<string, { isChecked: boolean; name: string }>;
  getRoomType: (roomType: roomTypeProp) => void;
  handleChangeName: (name: string) => void;
  toggleCheckbox: (user: UserConfig, isChecked: boolean) => void;
  handleCreateRoom: () => void;
  clearCheckList: () => void;
}

const useCreateChatRoomModalStore = create<CreateChatRoomModalStoreProps>(
  (set, get) => ({
    roomType: "",
    chatName: "",
    checkList: new Map(),

    handleChangeName: (name) => set(() => ({ chatName: name })),
    getRoomType: (roomType) => set(() => ({ roomType: roomType })),
    toggleCheckbox: (user, isChecked) =>
      set((state) => {
        const newCheckedState = new Map(state.checkList);

        newCheckedState.set(user.loginId, {
          isChecked: isChecked,
          name: user.name,
        });

        return { checkList: newCheckedState };
      }),
    handleCreateRoom: () => {
      const { roomType, chatName, checkList } = get();
      const roomUuid = uuidv4();
      const { createChatRoom } = useWebSocketStore.getState();

      // 체크리스트에서 isChecked가 true인 항목만 participant 배열에 추가
      const participants = Array.from(checkList.values())
        .filter((item) => item.isChecked)
        .map((item) => item.name);

      const roomData = {
        creator: "song",
        roomType,
        title: chatName,
        participant: participants,
        roomId: roomUuid,
      };

      createChatRoom(roomData);
    },

    // modal 정보 초기화
    clearCheckList: () => {
      set({
        roomType: "",
        chatName: "",
        checkList: new Map(),
      });
    },
  })
);

export default useCreateChatRoomModalStore;
