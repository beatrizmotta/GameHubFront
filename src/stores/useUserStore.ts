import { create } from "zustand";
import type { User } from "../api/models/user.model";
import { getLoggedUser, logout } from "../utils/auth.utils";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}
const useUser = create<UserState>((set) => ({
  user: (() => {
    return getLoggedUser();
  })(),
  setUser: (user: User) => set({ user }),
  logoutUser: () => {
    set({ user: null });
    logout();
  },
}));

export default useUser;
