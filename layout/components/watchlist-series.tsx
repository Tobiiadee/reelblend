/** @format */

import { Text } from "@/modules/common/components/text";
import React from "react";
import MovieCard from "./movie-card";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { motion } from "framer-motion";
import { AnimVariants } from "./watchlist-movies";
import { useQuery } from "@tanstack/react-query";
import { getSeriesDetails } from "@/lib/services/tmdb-services";

export default function WatchlistSeries({
  seriesIds,
}: {
  seriesIds: string[];
}) {
  const { data: seriesWatchlist, isLoading: seriesLoading } = useQuery({
    queryKey: ["watchlist", "series"],
    queryFn: () => Promise.all(seriesIds.map(getSeriesDetails)),
    enabled: seriesIds.length > 0,
  });

  return (
    <>
      {seriesWatchlist && seriesWatchlist?.length > 0 && (
        <div>
          <Text variant={"h5"} className='font-semibold my-6'>
            Series
          </Text>

          <div
            id='hide-scrollbar'
            className='flex space-x-1 md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6 overflow-x-scroll'>
            {seriesLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <MovieSkeleton key={index} />
              ))}
            {seriesWatchlist?.map((watchlist) => (
              <motion.div
                variants={AnimVariants}
                initial='hidden'
                animate='visible'
                exit={"hidden"}
                key={watchlist.id}
                className='w-full'>
                <MovieCard
                  posterPath={watchlist.poster_path}
                  title={watchlist.original_name}
                  year={watchlist.first_air_date}
                  rating={watchlist.vote_average}
                  id={watchlist.id}
                  type='series'
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
