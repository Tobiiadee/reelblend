/** @format */

"use client";

import React from "react";
import MovieCard from "./movie-card";
import { Text } from "@/modules/common/components/text";
import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { Button } from "@/modules/common/ui/button";
import Link from "next/link";
import EmptyStateError from "@/modules/common/ui/empty-states/empty-state-error";
import usePaginationStoreMovies from "@/modules/store/pagination-store-movies";

export default function AllMovies() {
  const { pageNumber } = usePaginationStoreMovies();

  const {
    data: allMovies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all-movies"],
    queryFn: getAllMovies,
  });

  if (error) {
    return <EmptyStateError />;
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between my-6'>
        <Text variant='h3' className='font-bold'>
          All Movies
        </Text>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))
        ) : allMovies && allMovies.results.length > 0 ? (
          allMovies.results.map(
            ({ id, title, release_date, poster_path, vote_average }) => (
              <MovieCard
                key={id}
                id={id}
                title={title}
                year={release_date}
                posterPath={poster_path}
                rating={vote_average}
                type='movie'
              />
            )
          )
        ) : (
          <Text variant='p' className='text-center col-span-full'>
            No movies available.
          </Text>
        )}
      </div>

      <div className='w-full flex items-center justify-center mt-8'>
        <Button asChild variant='ghost' className="bg-foreground/10 py-5 rounded-2xl">
          <Link href='/all_movies?page=2'>
            <Text variant='p' className='font-medium'>
              Load more movies
            </Text>
          </Link>
        </Button>
      </div>
    </div>
  );
}
