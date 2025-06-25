import { create } from "zustand";

interface ScheduleType {
  scheduleId: string | null;
  title: string | null;
  content: string | null;
}

interface ScheduleModalState {
  isScheduleModalOpen: boolean;

  schedule: ScheduleType;

  setIsScheduleModalOpen: (value: boolean) => void;

  setSchedule: (value: ScheduleType) => void;
  setScheduleTitle: (value: string) => void;
  setScheduleContent: (value: string) => void;
}

const useScheduleModalStore = create<ScheduleModalState>((set) => ({
  isScheduleModalOpen: false,

  schedule: {
    scheduleId: null,
    title: null,
    content: null,
  },

  setIsScheduleModalOpen: (value: boolean) => set({ isScheduleModalOpen: value }),

  setSchedule: (value: ScheduleType) => set({ schedule: value }),
  setScheduleTitle(value) {
    set((state) => ({
      schedule: {
        ...state.schedule,
        title: value,
      },
    }));
  },
  setScheduleContent(value) {
    set((state) => ({
      schedule: {
        ...state.schedule,
        content: value,
      },
    }));
  },
}))

export default useScheduleModalStore;