/** @format */

import getWatchlist from "@/hooks/get-watchlist";
import { create } from "zustand";

interface WatchlistStateType {
  inWatchlist: boolean;
  isMatchedItem: boolean;
  setIsMatchedItem: (value: boolean) => void;
  setInWatchlist: (value: boolean) => void; // Function to set watchlist IDs
}

const useWatchlistState = create<WatchlistStateType>((set) => ({
  inWatchlist: true,
  isMatchedItem: false,
  setIsMatchedItem: (newValue) =>
    set(() => ({
      isMatchedItem: newValue,
    })),
  setInWatchlist: (newValue) =>
    set(() => ({
      inWatchlist: newValue,
    })),
}));

export default useWatchlistState;
