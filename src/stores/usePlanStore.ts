import { TagsType } from "@/types/place/type";
import { create } from "zustand";


interface PlanState {
  isPending: boolean;

  days: number;
  tags: TagsType;

  setIsPending: (value: boolean) => void;

  setDays: (value: number) => void;
  setTag: (type: keyof TagsType, value: string) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  isPending: true,

  days: 0,
  tags: {
    region: null,
    people: null,
    companions: null,
    theme: null,
  },

  setIsPending: (value: boolean) => set({ isPending: value }),

  setDays: (value: number) => set({ days: value }),
  setTag: (type: keyof TagsType, value: string) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [type]: value,
      },
    })),
}))

export default usePlanStore;