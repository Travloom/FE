import { TagsType } from "@/types/place/type";
import { create } from "zustand";


interface PlanState {
  isSchedulePending: boolean;
  isInfoPending: boolean;

  startDate: Date | null;
  endDate: Date | null;
  days: number;
  tags: TagsType;

  setIsSchedulePending: (value: boolean) => void;
  setIsInfoPending: (value: boolean) => void;

  setDays: (startDate: Date, endDate: Date) => void;
  setTag: (type: keyof TagsType, value: string) => void;
  setTags: (tags: TagsType) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  isSchedulePending: true,
  isInfoPending: true,

  startDate: null,
  endDate: null,
  days: 1,
  tags: {
    region: null,
    people: null,
    companions: null,
    theme: null,
  },

  setIsSchedulePending: (value: boolean) => set({ isSchedulePending: value }),
  setIsInfoPending: (value: boolean) => set({ isSchedulePending: value }),

  setDays: (startDate: Date, endDate: Date) => {

    const convertedStartDate = new Date(startDate)
    const convertedEndDate = new Date(endDate)

    const timeDiff = convertedEndDate.getTime() - convertedStartDate.getTime() + 1;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    set({ startDate: convertedStartDate, endDate: convertedEndDate, days: dayDiff})
  },

  setTag: (type: keyof TagsType, value: string) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [type]: value,
      },
    })),
  setTags: (tags: TagsType) => set({ tags: tags })
}))

export default usePlanStore;