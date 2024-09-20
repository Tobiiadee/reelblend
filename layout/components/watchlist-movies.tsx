/** @format */

import { Text } from "@/modules/common/components/text";
import React from "react";
import MovieCard from "./movie-card";
import useWatchlistStore from "@/modules/store/watchlist-store";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";

export default function WatchlistMovies({
  watchlist,
  isLoading,
}: {
  watchlist: tmdbMovieDetialsType[];
  isLoading: boolean;
}) {
  return (
    <div>
      <Text variant={"h5"} className='font-semibold my-6'>
        Movies
      </Text>

      <div id="hide-scrollbar" className='flex space-x-1 md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6 overflow-x-scroll'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}

        {watchlist.map((watchlist) => (
          <MovieCard
            key={watchlist.id}
            posterPath={watchlist.poster_path}
            title={watchlist.original_title}
            year={watchlist.release_date}
            rating={watchlist.vote_average}
            id={watchlist.id}
            type='movie'
          />
        ))}
      </div>
    </div>
  );
}
