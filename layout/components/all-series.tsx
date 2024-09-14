/** @format */

"use client";

import React from "react";
import MovieCard from "./movie-card";
import { Text } from "@/modules/common/components/text";
import { useQuery } from "@tanstack/react-query";
import { getAllSeries } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { Button } from "@/modules/common/ui/button";
import Link from "next/link";
import EmptyStateError from "@/modules/common/ui/empty-states/empty-state-error";

export default function AllSeries() {
  const {
    data: allSeries,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all-series"],
    queryFn: getAllSeries,
  });

  if (error) {
    return <EmptyStateError />;
  }

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between my-6'>
        <Text variant='h3' className='font-bold'>
          All Series
        </Text>

        <Button asChild variant='link'>
          <Link href='/all_series?page=1'>
            <Text variant='p' className='font-medium'>
              View All
            </Text>
          </Link>
        </Button>
      </div>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))
        ) : allSeries && allSeries.results.length > 0 ? (
          allSeries.results.map(
            ({
              id,
              original_name,
              first_air_date,
              poster_path,
              vote_average,
            }) => (
              <MovieCard
                key={id}
                id={id}
                title={original_name}
                year={first_air_date}
                posterPath={poster_path}
                rating={vote_average}
                type='series'
              />
            )
          )
        ) : (
          <Text variant='p' className='text-center col-span-full'>
            No series available.
          </Text>
        )}
      </div>
    </div>
  );
}
