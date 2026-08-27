"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  isBrochureModalOpen: boolean;
  openBrochureModal: () => void;
  closeBrochureModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isContactModalOpen,
        openContactModal: () => setIsContactModalOpen(true),
        closeContactModal: () => setIsContactModalOpen(false),
        isBrochureModalOpen,
        openBrochureModal: () => setIsBrochureModalOpen(true),
        closeBrochureModal: () => setIsBrochureModalOpen(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
