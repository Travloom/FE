import { create } from 'zustand';

type AlertModalState = {
  isAlertModalOpen: boolean;
  setIsAlertModalOpen: (value: boolean) => void;
  AlertModalText: string;
  setAlertModalText: (value: string) => void;
}

const useAlertModalStore = create<AlertModalState>((set) => ({
  isAlertModalOpen: false,
  AlertModalText: "",

  setIsAlertModalOpen(value) {
    set({ 
      isAlertModalOpen: value 
    })
  },
  setAlertModalText(value) {
    set({
      AlertModalText: value
    })
  },
}))

export default useAlertModalStore;