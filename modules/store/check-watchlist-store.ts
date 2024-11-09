/** @format */

import getWatchlist from "@/hooks/get-watchlist";
import { create } from "zustand";

interface WatchlistStateType {
  inWatchlist: boolean;
  // Function to check if the movie/series is in the watchlist
  setInWatchlist: (value: boolean) => void; // Function to set watchlist IDs
}

const useWatchlistState = create<WatchlistStateType>((set) => ({
  inWatchlist: true,
  setInWatchlist: (newValue) =>
    set(() => ({
      inWatchlist: newValue,
    })),
}));

export default useWatchlistState;
