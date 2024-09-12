/** @format */
"use client";

import { Text } from "@/modules/common/components/text";
import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./movie-card";
import { Button } from "@/modules/common/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useScroll from "@/hooks/use-scroll";
import { useQuery } from "@tanstack/react-query";
import { getTrendingSeries } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";

export default function TrendingSeries() {
  const { showLeft, showRight, scrollLeft, scrollRight, scrollRef } =
    useScroll();

  const { data: trendingSeries, isLoading } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => getTrendingSeries(),
  });

  return (
    <div className='w-full h-full relative'>
      <Text variant={"h3"} className='text-bold my-6'>
        Trending
      </Text>

      <div className='relative h-full md:pl-6 group'>
        <div className='absolute hidden top-0 -left-1 z-30 opacity-0 pb-16 h-full group-hover:opacity-100 md:flex justify-center items-center text-background transition-opacity duration-700'>
          {showLeft && (
            <Button
              variant={"default"}
              className='py-6 px-1 rounded-full '
              onClick={scrollLeft}>
              <ChevronLeft size={40} strokeWidth={1} />
            </Button>
          )}
        </div>

        <div
          id='hide-scrollbar'
          ref={scrollRef}
          className='flex space-x-4 rounded-lg overflow-y-scroll'>
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <MovieSkeleton key={index} />
            ))}
          {trendingSeries && trendingSeries?.results.map((series) => (
            <MovieCard
              key={series.id}
              id={series.id}
              title={series.original_name}
              year={series.first_air_date}
              posterPath={series.poster_path}
              rating={series.vote_average}
            />
          ))}
        </div>

        <div className='absolute hidden top-0 -right-7 z-30 pb-16 opacity-0 group-hover:opacity-100 text-white h-full md:flex justify-center items-center transition-opacity duration-700'>
          {showRight && (
            <Button
              variant={"default"}
              className='py-6 px-1 rounded-full'
              onClick={scrollRight}>
              <ChevronRight size={40} strokeWidth={1} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
