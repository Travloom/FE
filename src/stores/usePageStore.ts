import { create } from "zustand";

interface PageState {
  isPagePending: boolean;
  
  setIsPagePending: (value: boolean) => void;
}

const usePageStore = create<PageState>((set) => ({
  isPagePending: false,

  setIsPagePending: (value: boolean) => set({isPagePending: value}),
}))

export default usePageStore;