// Modal.tsx
import { useModalStore } from "@/share/store/useModalStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/share/ui/dialog";
import {
  CreateRoomModalContent,
  CreateRoomModalFooter,
  CreateRoomModalTitle,
} from "./CreateRoomModal";

const ModalContainer = () => {
  const { isOpen, isdirty, modalContents } = useModalStore();

  if (!isOpen || !modalContents) return null;

  const { componentCont, componentFooter, componentTit } = modalContents;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        isdirty();
      }}
    >
      <DialogContent className="box-border p-2 ">
        <DialogHeader className="box-border px-5">{componentTit}</DialogHeader>
        <div className="box-border px-5">{componentCont}</div>
        {componentFooter && <DialogFooter>{componentFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

// 채팅방 생성 모달
ModalContainer.CreateRoomCont = CreateRoomModalContent;
ModalContainer.CreateRoomTitle = CreateRoomModalTitle;
ModalContainer.CreateRooomButton = CreateRoomModalFooter;

// 경고 창

export default ModalContainer;
