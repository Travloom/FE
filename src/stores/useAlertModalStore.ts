import { create } from 'zustand';

type NoticeModalState = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;
  NoticeModalText: string;
  setNoticeModalText: (value: string) => void;

  isAlert: boolean;
  setIsAlert: (value: boolean) => void;
}

const useNoticeModalStore = create<NoticeModalState>((set) => ({
  isNoticeModalOpen: false,
  NoticeModalText: "",
  isAlert: false,

  setIsNoticeModalOpen(value) {
    set({
      isNoticeModalOpen: value
    })
  },
  setNoticeModalText(value) {
    set({
      NoticeModalText: value
    })
  },

  setIsAlert(value) {
    set({
      isAlert: value
    })
  }
}))

export default useNoticeModalStore;