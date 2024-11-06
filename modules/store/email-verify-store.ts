import { create } from "zustand";

interface StoreType {
  emailVerify: boolean;
  setEmailVerify: (emailVerify: boolean) => void;
}

const useEmailVerifyStore = create<StoreType>((set) => ({
  emailVerify: false,
  setEmailVerify: (newEmailVerify) =>
    set(() => ({
      emailVerify: newEmailVerify,
    })),
}));

export default useEmailVerifyStore;
