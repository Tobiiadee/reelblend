/** @format */

import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import React from "react";
import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { getAllMoviesPage } from "@/lib/services/tmdb-services";
import usePaginationStore from "@/modules/store/pagination-store";

export default function PaginationMovies() {

    const { pageNumber } = usePaginationStore();

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", pageNumber],
    queryFn: () => getAllMoviesPage(pageNumber),
  });

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      {movies && movies?.results.length >= 0
        ? movies.results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              year={movie.release_date}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
            />
          ))
        : null}
    </div>
  );
}
