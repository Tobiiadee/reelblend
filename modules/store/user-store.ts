import { create } from "zustand";

type UserType = {
  uid: string;
  email: string;
  displayName: string;
};

interface StoreType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const useUserStore = create<StoreType>((set) => ({
  user: null,
  setUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
}));

export default useUserStore;
