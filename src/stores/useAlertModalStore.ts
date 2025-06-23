import { create } from 'zustand';

type NoticeModalState = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;
  noticeModalText: string;
  setNoticeModalText: (value: string) => void;

  isAlert: boolean;
  setIsAlert: (value: boolean) => void;
}

const useNoticeModalStore = create<NoticeModalState>((set) => ({
  isNoticeModalOpen: false,
  noticeModalText: "",
  isAlert: false,

  setIsNoticeModalOpen(value) {
    set({
      isNoticeModalOpen: value
    })
  },
  setNoticeModalText(value) {
    set({
      noticeModalText: value
    })
  },

  setIsAlert(value) {
    set({
      isAlert: value
    })
  }
}))

export default useNoticeModalStore;