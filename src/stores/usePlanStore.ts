import { create } from "zustand";


interface PlanState {
  isPending: boolean;

  setIsPending: (value: boolean) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  isPending: true,

  setIsPending: (value: boolean) => set({isPending: value}),
}))

export default usePlanStore;