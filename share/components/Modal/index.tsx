// Modal.tsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/share/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[500px] h-[600px] rounded-md">
        <DialogHeader>
          <DialogTitle className="mt-5 text-lg text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="box-border px-5">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
