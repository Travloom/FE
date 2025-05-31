import { create } from "zustand";

interface PageState {
  isPagePending: boolean;

  title: string | null;
  
  setIsPagePending: (value: boolean) => void;

  setTitle: (value: string | null) => void;
}

const usePageStore = create<PageState>((set) => ({
  isPagePending: false,

  title: null,

  setIsPagePending: (value: boolean) => set({isPagePending: value}),

  setTitle: (value : string | null) => set({ title: value }),
}))

export default usePageStore;