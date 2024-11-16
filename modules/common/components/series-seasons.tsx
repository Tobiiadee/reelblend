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
import SeriesSeasonsCard from "./series-seasons-card";

const MovieSrcArray = [
  "/images/v1.jpg",
  "/images/v2.jpg",
  "/images/v3.jpg",
  "/images/v4.jpg",
  "/images/v5.jpg",
  "/images/v6.jpg",
];

export default function SeriesSeasons({
  seasonsDetails,
}: {
  seasonsDetails: any[];
}) {
  return (
    <div className='col-span-1 flex justify-center mt-8 md:mt-0 overflow-hidden w-full h-[80vh]'>
      <div className='flex flex-col space-y-2 w-full '>
        <div className='md:px-4'>
          <Text variant={"h5"} className='font-semibold'>
            Seasons
          </Text>
        </div>

        <div
          className='w-full flex md:flex-col items-center md:items-start p-4 md:space-y-6 overflow-y-auto overflow-x-hidden'>
          {seasonsDetails.map((season) => (
            <SeriesSeasonsCard
              key={season.id}
              details={season}
              type={"series"}
            />
          ))}
        </div>

        {seasonsDetails && seasonsDetails.length < 0 && (
          <div className='w-full h-full grid place-items-center'>
            <Text variant={"p"}>No seasons</Text>
          </div>
        )}
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
