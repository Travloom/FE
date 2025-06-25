import { create } from "zustand";

interface DeviceState {
  deviceType: string | null;
  
  setDeviceType: (value: string) => void;
}

const useDeviceStore = create<DeviceState>((set) => ({
  deviceType: null,

  setDeviceType: (value: string) => set({deviceType: value}),
}))

export default useDeviceStore;