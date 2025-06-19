import { create } from 'zustand';

type CheckModalState = {
  isCheckModalOpen: boolean;
  checkModalText: string;

  Fn: () => void;

  setIsCheckModalOpen: (value: boolean) => void;
  setCheckModalText: (value: string) => void;

  setFn: (value: () => void) => void;
}

const useCheckModalStore = create<CheckModalState>((set) => ({
  isCheckModalOpen: false,
  checkModalText: "",

  Fn: () => {},

  setIsCheckModalOpen(value) {
    set({ isCheckModalOpen: value })
  },
  setCheckModalText(value) {
    set({ checkModalText: value })
  },

  setFn(value) {
    set({ Fn: value })
  }
}))

export default useCheckModalStore;