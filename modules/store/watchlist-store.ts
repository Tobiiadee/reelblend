/** @format */

import { create } from "zustand";

interface WatchlistStoreType {
  watchlist: { id: number; title: string; type: "series" | "movie" }[];
  addToWatchlist: (watchlist: {
    id: number;
    title: string;
    type: "series" | "movie";
  }) => void;
}

const useWatchlistStore = create<WatchlistStoreType>((set) => ({
  watchlist: [],
  addToWatchlist: (newWatchlist) =>
    set((state) => ({
      watchlist: [...state.watchlist, newWatchlist], // Use spread to add new items
    })),
}));

export default useWatchlistStore;
