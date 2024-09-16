/** @format */

"use client"

import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import React from "react";
import MovieCard from "./movie-card";
import { useQuery } from "@tanstack/react-query";
import { getAllSeriesPage } from "@/lib/services/tmdb-services";
import usePaginationStoreSeries from "@/modules/store/pagination-store-series";

export default function PaginationSeries() {

    const { pageNumber } = usePaginationStoreSeries();

  const { data: series, isLoading } = useQuery({
    queryKey: ["series", pageNumber],
    queryFn: () => getAllSeriesPage(pageNumber),
  });

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <MovieSkeleton key={index} />
        ))}
      {series && series?.results.length >= 0
        ? series.results.map((series) => (
            <MovieCard
              key={series.id}
              id={series.id}
              title={series.original_name}
              year={series.first_air_date}
              posterPath={series.poster_path}
              rating={series.vote_average}
              type="series"
            />
          ))
        : null}
    </div>
  );
}
