import { create } from "zustand";

interface PageState {
  isPagePending: boolean;

  pageTitle: string | null;
  
  setIsPagePending: (value: boolean) => void;

  setPageTitle: (value: string | null) => void;
}

const usePageStore = create<PageState>((set) => ({
  isPagePending: false,

  pageTitle: null,

  setIsPagePending: (value: boolean) => set({isPagePending: value}),

  setPageTitle: (value : string | null) => set({ pageTitle: value }),
}))

export default usePageStore;