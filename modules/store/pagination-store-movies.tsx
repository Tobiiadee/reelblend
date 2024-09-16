/** @format */

import { create } from "zustand";

// Define the store interface
interface StoreType {
  pageNumber: number; // Current page number
  setMoviesPageNumber: (pageNumber: number) => void;
}

// Create the Zustand store
const usePaginationStoreMovies = create<StoreType>((set) => ({
  pageNumber: 2, // Initial page number
  setMoviesPageNumber: (pageNumber) =>
    set(() => {
      return { pageNumber };
    }),
}));

export default usePaginationStoreMovies;
