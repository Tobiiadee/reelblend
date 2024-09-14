/** @format */

"use client";

import React from "react";
import { Text } from "@/modules/common/components/text";
import MovieCard from "./movie-card";
import { Button } from "@/modules/common/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useScroll from "@/hooks/use-scroll";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import EmptyStateError from "@/modules/common/ui/empty-states/empty-state-error";

export default function Trending() {
  const { showLeft, showRight, scrollLeft, scrollRight, scrollRef } =
    useScroll();

  const {
    data: trendingMovies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: getTrendingMovies,
  });

  if (error) {
    return <EmptyStateError />;
  }

  return (
    <div className='w-full h-full relative'>
      <Text variant='h3' className='font-bold my-6'>
        Trending Movies
      </Text>

      <div className='relative h-full md:pl-6 group'>
        {/* Scroll Left Button */}
        <div className='absolute hidden top-0 -left-1 z-30 opacity-0 pb-16 h-full group-hover:opacity-100 md:flex justify-center items-center transition-opacity duration-700'>
          {showLeft && (
            <Button
              variant='default'
              className='py-6 px-1 rounded-full'
              onClick={scrollLeft}>
              <ChevronLeft size={40} strokeWidth={1} />
            </Button>
          )}
        </div>

        {/* Trending Movies List */}
        <div
          ref={scrollRef}
          id='hide-scrollbar'
          className='flex space-x-4 overflow-y-scroll scrollbar-hide'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))
            : trendingMovies?.results.map(
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
              )}
        </div>

        {/* Scroll Right Button */}
        <div className='absolute hidden top-0 -right-7 z-30 pb-16 opacity-0 group-hover:opacity-100 h-full md:flex justify-center items-center transition-opacity duration-700'>
          {showRight && (
            <Button
              variant='default'
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
