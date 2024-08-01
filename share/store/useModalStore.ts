// store/useModalStore.ts
import { create } from "zustand";
import useCreateChatRoomModalStore from "./useCreateChatRoomModalStore";

export interface ModalContents {
  componentTit: React.ReactNode | null;
  componentCont: React.ReactNode | null;
  componentFooter?: React.ReactNode | null;
}

interface ModalState {
  isOpen: boolean;
  modalContents: ModalContents;
  openModal: (modalContents: ModalContents) => void;
  closeModal: () => void;
  isdirty: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalContents: {
    componentTit: null,
    componentCont: null,
    componentFooter: null,
  },
  openModal: (modalContents: ModalContents) =>
    set({ isOpen: true, modalContents: modalContents }),
  closeModal: () => {
    set({
      isOpen: false,
    });
  },
  // 모달 초기화
  isdirty: () => {
    const { chatName, checkList, clearCheckList } =
      useCreateChatRoomModalStore.getState();

    console.log(chatName, checkList);
    if (checkList.size > 0 || chatName) {
      if (
        confirm("체크박스를 종료하시겠습니까? 설정하신 정보가 초기화 됩니다.")
      ) {
        set({
          isOpen: false,
        });
        clearCheckList();
      }
      return;
    } else {
      set({
        isOpen: false,
      });
      clearCheckList();
    }
  },
}));
