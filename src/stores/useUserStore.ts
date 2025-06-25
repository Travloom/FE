import { create } from "zustand";

interface UserType {
  name: string | null;
  email: string | null;
  profileImageUrl: string | null;
}

interface UserState {
  user: UserType | null;
  isLoggedIn: boolean | null;

  setUser: (value: UserType | null) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: null,

  setUser(user) {
    set({user: user, isLoggedIn: !!user})
  },
}))

export default useUserStore;