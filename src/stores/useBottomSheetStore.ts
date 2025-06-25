import { MID_HEIGHT } from "@/constants/Map";
import { create } from "zustand";

interface BottomSheetState {
  currentHeight: number;
  
  setCurrentHeight: (value: number) => void;
}

const useBottomSheetStore = create<BottomSheetState>((set) => ({
  currentHeight: MID_HEIGHT,

  setCurrentHeight: (value: number) => set({currentHeight: value})
}))

export default useBottomSheetStore;