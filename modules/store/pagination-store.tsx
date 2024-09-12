/** @format */

import { create } from "zustand";

// Define the store interface
interface StoreType {
  movies: tmdbMovieResponse[]; // Movie data
  pageNumber: number; // Current page number
  setMovies: (movies: tmdbMovieResponse[]) => void;
  setPageNumber: (pageNumber: number) => void;
}

// Create the Zustand store
const usePaginationStore = create<StoreType>((set) => ({
  movies: [],
  pageNumber: 1, // Initial page number
  setMovies: (newMovies) =>
    set(() => {
      console.log("Setting new movies:", newMovies);
      return { movies: newMovies };
    }),
  setPageNumber: (pageNumber) =>
    set(() => {
      return { pageNumber };
    }),
}));

export default usePaginationStore;
