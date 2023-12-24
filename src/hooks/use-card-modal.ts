import { create } from "zustand";

type CardModalStore = {
  modalId?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  modalId: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, modalId: id }),
  onClose: () => set({ isOpen: false, modalId: undefined }),
}));
