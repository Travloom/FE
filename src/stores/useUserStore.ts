import { create } from "zustand";

interface UserType {
  name: string | null;
  email: string | null;
  profileImageUrl: string | null;
}

interface UserState {
  user: UserType | null;

  setUser: (value: UserType | null) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user: UserType | null) => set({user: user}),
}))

export default useUserStore;