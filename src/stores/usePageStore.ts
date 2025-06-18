import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PageState {
  isPagePending: boolean;

  pageTitle: string | null;

  setIsPagePending: (value: boolean) => void;

  setPageTitle: (value: string | null) => void;
}

const usePageStore = create(
  persist<PageState>(
    (set) => ({
      isPagePending: false,

      pageTitle: null,

      setIsPagePending: (value: boolean) => set({ isPagePending: value }),

      setPageTitle: (value: string | null) => set({ pageTitle: value }),
    }),
    {
      name: "PageState",
      partialize: (state) => {
        return {
          isPagePending: state.isPagePending,
        } as PageState;
      },
    }
  ))

export default usePageStore;