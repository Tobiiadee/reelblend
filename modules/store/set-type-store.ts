/** @format */

import { create } from "zustand";

interface StoreType {
  typeState: "movies" | "series";
  setTypeState: (newState: "movies" | "series") => void;
}

const useTypeStateStore = create<StoreType>((set) => ({
  typeState: "movies",
  setTypeState: (newState) => 
    set(() => ({
      typeState: newState,
    })),
}));

export default useTypeStateStore;
