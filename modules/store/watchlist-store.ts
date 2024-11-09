import { create } from "zustand";

interface WatchlistStoreType {
  inWatchlist: boolean;
  setInWatchlist: (inWatchlist: boolean) => void;
}

const useWatchlistStore = create<WatchlistStoreType>((set) => ({
  inWatchlist: false,
  setInWatchlist: (inWatchlist) => set({ inWatchlist }),
}));

export default useWatchlistStore;
