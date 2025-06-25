import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;

  setIsSidebarOpen: (value: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,

  setIsSidebarOpen(value) {
    set({
      isSidebarOpen: value
    })
  }
}))

export default useSidebarStore;