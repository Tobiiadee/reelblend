/** @format */

import { Text } from "@/modules/common/components/text";
import React from "react";
import MovieCard from "./movie-card";
import useWatchlistStore from "@/modules/store/watchlist-store";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";

export default function WatchlistSeries({
  watchlist,
  isLoading,
}: {
  watchlist: tmdbSeriesDetailsType[];
  isLoading: boolean;
}) {
  return (
    <div>
      <Text variant={"h5"} className='font-semibold my-6'>
        Series
      </Text>

      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}

        {watchlist.map((watchlist, index) => (
          <MovieCard
            key={watchlist.id}
            posterPath={watchlist.poster_path}
            title={watchlist.original_name}
            year={watchlist.first_air_date}
            rating={watchlist.vote_average}
            id={watchlist.id}
            type='series'
          />
        ))}
      </div>
    </div>
  );
}
