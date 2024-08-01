"use client";
import { createContext, useContext } from "react";
import ModalContainer from "../components/Modal/ModalContainer";
import { useModalStore } from "../store/useModalStore";

const ModalContext = createContext({});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { openModal, closeModal } = useModalStore();
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ModalContainer />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
