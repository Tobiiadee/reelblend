/** @format */

"use client"

import { Text } from "@/modules/common/components/text";
import React from "react";
import MovieCard from "./movie-card";
import { getUpcomingMovies } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { useQuery } from "@tanstack/react-query";

export default function Upcoming() {
  const { data: upcomingMovies, isLoading } = useQuery({
    queryKey: ["upcoming-Movies"],
    queryFn: () => getUpcomingMovies(),
  });

  return (
    <div className='w-full h-max'>
      <Text variant={"h3"} className='text-bold my-6'>
        Upcoming Movies
      </Text>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        {upcomingMovies && upcomingMovies?.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            year={movie.release_date}
            title={movie.title}
            rating={movie.vote_average}
            posterPath={movie.poster_path}
            type="movie"
          />
        ))}
      </div>
    </div>
  );
}
