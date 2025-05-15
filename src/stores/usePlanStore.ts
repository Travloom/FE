import { create } from "zustand";


interface PlanState {
  title: string | null;

  setTitle: (value: string) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  title: null,

  setTitle: (value: string) => set({title: value}),
}))

export default usePlanStore;