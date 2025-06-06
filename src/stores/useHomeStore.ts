import { TagsType } from "@/types/place/type";
import { create } from "zustand";

interface TagState {
  title: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: TagsType;
  
  setTitle: (value: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setTag: (type: keyof TagsType, value: string) => void;
}

const useHomeStore = create<TagState>((set) => ({
  title: null,
  startDate: null,
  endDate: null,
  tags: {
    region: null,
    people: null,
    companions: null,
    theme: null,
  },

  setTitle: (value: string | null) => set({title: value}),
  setStartDate: (date: Date | null) => set({startDate: date}),
  setEndDate: (date: Date | null) => set({endDate: date}),
  setTag: (type: keyof TagsType, value: string) =>
    set((state) => ({
      tags: {
        ...state.tags,
        [type]: value,
      },
    })),
}))

export default useHomeStore;