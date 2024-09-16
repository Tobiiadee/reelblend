/** @format */

import { create } from "zustand";

// Define the store interface
interface StoreType {
  pageNumber: number; // Current page number
  setSeriesPageNumber: (pageNumber: number) => void;
}

// Create the Zustand store
const usePaginationStoreSeries = create<StoreType>((set) => ({
  pageNumber: 2, // Initial page number
  setSeriesPageNumber: (pageNumber) =>
    set(() => {
      return { pageNumber };
    }),
}));

export default usePaginationStoreSeries;
