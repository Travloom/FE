import { create } from "zustand";

interface MapState {
  isReady: boolean;
  
  setIsReady: (value: boolean) => void;
}

const useMapStore = create<MapState>((set) => ({
  isReady: false,

  setIsReady: (value: boolean) => set({isReady: value}),
}))

export default useMapStore;