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
import { redirect } from "next/navigation";

export default function AllSeries() {
  const {
    data: allSeries,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["all-movies"],
    queryFn: () => getAllSeries(),
  });

  if (error) redirect("/error");

  

  return (
    <div className='mt-10'>
      <div className='flex items-center justify-between my-6'>
        <Text variant={"h3"} className='text-bold '>
          All Series
        </Text>

        <Button asChild variant={"link"}>
          <Link href={"/series?page=1"}>
            <Text variant={"p"} className='font-medium'>
              View All
            </Text>
          </Link>
        </Button>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        {allSeries && allSeries?.results.length >= 0
          ? allSeries.results.map((series) => (
              <MovieCard
                key={series.id}
                id={series.id}
                title={series.original_name}
                year={series.first_air_date}
                posterPath={series.poster_path}
                rating={series.vote_average}
              />
            ))
          : null}
      </div>
    </div>
  );
}

// const AllMoviesSkeleton = () => {
//   return (
//     <div className='flex flex-col space-y-2 w-full md:min-w-[280px] lg:min-w-[220px] aspect-video'>
//       <Skeleton className='w-full h-full' />
//       <div className='flex items-center justify-between'>
//         <Skeleton className='w-24 h-6' />
//         <Skeleton className='w-16 h-6' />
//       </div>
//     </div>
//   );
// };
