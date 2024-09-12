/** @format */

"use client"

import { Text } from "@/modules/common/components/text";
import React from "react";
import MovieCard from "./movie-card";
import { getUpcomingMovies, getUpcomingSeries } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { useQuery } from "@tanstack/react-query";

export default function UpcomingSeries() {
  const { data: upcomingSeries, isLoading } = useQuery({
    queryKey: ["upcoming-Movies"],
    queryFn: () => getUpcomingSeries(),
  });

  return (
    <div className='w-full h-max'>
      <Text variant={"h3"} className='text-bold my-6'>
        Upcoming Series
      </Text>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        {upcomingSeries && upcomingSeries?.results.map((series) => (
          <MovieCard
            key={series.id}
            id={series.id}
            year={series.first_air_date}
            title={series.original_name}
            rating={series.vote_average}
            posterPath={series.poster_path}
          />
        ))}
      </div>
    </div>
  );
}
