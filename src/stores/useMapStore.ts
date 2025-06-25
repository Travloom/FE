import { create } from "zustand";

interface MapState {
  isReady: boolean;
  isOpen: boolean;
  
  setIsReady: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  

  map: google.maps.Map | null;

  setMap: (map: google.maps.Map) => void;
}

const useMapStore = create<MapState>((set) => ({
  isReady: false,
  isOpen: true,

  setIsReady: (value: boolean) => set({isReady: value}),
  setIsOpen: (value: boolean) => set({isOpen: value}),

  map: null,
  
  setMap: (map) => set({ map }),
}))

export default useMapStore;