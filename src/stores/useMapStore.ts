import { create } from "zustand";

interface MapState {
  isReady: boolean;
  isOpen: boolean;
  
  setIsReady: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

const useMapStore = create<MapState>((set) => ({
  isReady: false,
  isOpen: true,

  setIsReady: (value: boolean) => set({isReady: value}),
  setIsOpen: (value: boolean) => set({isOpen: value})
}))

export default useMapStore;