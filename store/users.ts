import { create } from "zustand";
import { User } from "@/types/User";

export type Store = {
  users: User[];
  addUsers: (users: User[]) => void;
};

export const useUsersStore = create<Store>((set) => ({
  users: [],
  addUsers: (users) => set((state) => ({ users: [...state.users, ...users] })),
}));
