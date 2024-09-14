/** @format */

import { create } from "zustand";

interface StoreType {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const useKeywordStore = create<StoreType>((set) => ({
  keyword: "",
  setKeyword: (newKeyword) => 
    set(() => ({
      keyword: newKeyword,
    })),
}));

export default useKeywordStore;