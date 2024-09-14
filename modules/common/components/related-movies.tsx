/** @format */

"use client";

import React from "react";
import RelatedMovieCard from "./related-movie-card";
import { Text } from "./text";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "@/lib/services/tmdb-services";
import { Skeleton } from "../ui/skeleton";

const MovieSrcArray = [
  "/images/v1.jpg",
  "/images/v2.jpg",
  "/images/v3.jpg",
  "/images/v4.jpg",
  "/images/v5.jpg",
  "/images/v6.jpg",
];

export default function RelatedMovies({ movieId, type }: { movieId: number, type: "movie" | "series" }) {
  const { data: relatedMovies } = useQuery({
    queryKey: ["related-movies"],
    queryFn: () => getSimilarMovies(movieId, type),
  });

  const limitRelatedMoviesArray = relatedMovies?.results
    ? relatedMovies?.results.slice(0, 4)
    : [];

  // const title = type === "series" ? relatedMovies.

  return (
    <div className='flex justify-between mt-8 md:mt-0 overflow-hidden'>
      <Separator orientation='vertical' className='hidden md:block' />

      <div className='flex flex-col space-y-6 w-full md:w-max'>
        <div className='md:px-4'>
          <Text variant={"p"} className='font-semibold'>
            Related Movies
          </Text>
        </div>

        <div
          id='hide-scrollbar'
          className='w-full md:w-max flex md:flex-col items-center md:items-start p-4 md:space-y-6 overflow-x-scroll'>
          {limitRelatedMoviesArray.map((movie) => (
            <RelatedMovieCard key={movie.id} details={movie} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function RelatedMovieSkeleton() {
  return (
    <div className='flex space-x-4'>
      <Skeleton className='w-16 h-24 rounded-lg' />
      <div className='flex flex-col space-y-4'>
        <Skeleton className='w-10 h-4' />
        <Skeleton className='w-10 h-4' />
      </div>
    </div>
  );
}
