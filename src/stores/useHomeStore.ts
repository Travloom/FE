import { TagsType } from "@/types/place/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TagState {
  isCreating: boolean;
  title: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: TagsType;
  setIsCreating: (value: boolean) => void;
  setTitle: (value: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setTag: (type: keyof TagsType, value: string) => void;
}

const useHomeStore = create(
  persist<TagState>(
    (set) => ({
      isCreating: false,
      title: null,
      startDate: null,
      endDate: null,
      tags: {
        region: null,
        people: null,
        companions: null,
        theme: null,
      },
      setIsCreating: (value: boolean) => set({ isCreating: value }),
      setTitle: (value: string) => set({ title: value }),
      setStartDate: (date: Date | null) => set({ startDate: date }),
      setEndDate: (date: Date | null) => set({ endDate: date }),
      setTag: (type: keyof TagsType, value: string) =>
        set((state) => ({
          tags: {
            ...state.tags,
            [type]: value,
          },
        })),
    }),
    {
      name: "homeStore",
      partialize: (state) => {

        const startDate = state.startDate ? new Date(state.startDate) : null;
        const endDate = state.endDate ? new Date(state.endDate) : null;
        const isDateExist = startDate !== null && endDate !== null;
        
        return {
          title: state.title,
          tags: state.tags,
          startDate: isDateExist ? startDate : null,
          endDate: isDateExist ? endDate : null,
        } as TagState;
      },
    }
  )
);

export default useHomeStore;
