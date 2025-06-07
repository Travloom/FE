import { TagsType } from "@/types/place/type";
import { create } from "zustand";


interface PlanState {
  isSchedulePending: boolean;
  isInfoPending: boolean | null;

  startDate: Date | null;
  endDate: Date | null;
  days: number | null;
  tags: TagsType;

  setIsSchedulePending: (value: boolean) => void;
  setIsInfoPending: (value: boolean) => void;

  setDays: (startDate: Date | null, endDate: Date | null) => void;
  setTag: (type: keyof TagsType, value: string) => void;
  setTags: (tags: TagsType | null) => void;
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
  setIsInfoPending: (value: boolean) => set({ isInfoPending: value }),

  setDays: (startDate: Date | null, endDate: Date | null) => {

    if (startDate && endDate) {
      const convertedStartDate = new Date(startDate)
      const convertedEndDate = new Date(endDate)

      const timeDiff = convertedEndDate.getTime() - convertedStartDate.getTime() + 1;
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      set({ startDate: convertedStartDate, endDate: convertedEndDate, days: dayDiff })
    }
    else {
      set({ startDate: null, endDate: null, days: null })
    }
  },

  setTag: (type: keyof TagsType, value: string) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [type]: value,
      },
    })),
  setTags: (tags: TagsType | null) => {
    if (tags) {
      set({ tags: tags })
    }
    else {
      set({
        tags: {
          region: null,
          people: null,
          companions: null,
          theme: null,
        }
      })
    }
  }
}))

export default usePlanStore;