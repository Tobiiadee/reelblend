/** @format */

import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import React from "react";
import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { getAllMoviesPage } from "@/lib/services/tmdb-services";
import usePaginationStoreMovies from "@/modules/store/pagination-store-movies";
import { Text } from "@/modules/common/components/text";
import { notFound } from "next/navigation";
import EmptyStateError from "@/modules/common/ui/empty-states/empty-state-error";

export default function PaginationMovies() {
  const { pageNumber } = usePaginationStoreMovies();

  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
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
              type='movie'
            />
          ))
        : null}
    </div>
  );
}
