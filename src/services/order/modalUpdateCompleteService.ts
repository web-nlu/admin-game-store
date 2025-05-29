// store/ModalUpdateCompleteStore.ts
import { create } from 'zustand';

type ModalUpdateCompleteState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModalUpdateCompleteStore = create<ModalUpdateCompleteState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
