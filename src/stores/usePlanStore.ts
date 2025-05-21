import { create } from "zustand";


interface PlanState {
  title: string | null;
  isPending: boolean;

  setTitle: (value: string) => void;
  setIsPending: (value: boolean) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  title: null,
  isPending: true,

  setTitle: (value: string) => set({title: value}),
  setIsPending: (value: boolean) => set({isPending: value}),
}))

export default usePlanStore;