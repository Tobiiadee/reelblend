/** @format */

"use client"

import React from "react";
import MovieCard from "./movie-card";
import { Text } from "@/modules/common/components/text";
import useWatchlistStore from "@/modules/store/watchlist-store";

export default function WatchlistMain() {
  const { watchlist } = useWatchlistStore();
  return (
    <>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
        {watchlist.map((watchlist, index) => (
          <MovieCard
            key={index}
            posterPath=''
            title=''
            year=''
            rating={5}
            id={1}
            type='movie'
          />
        ))}
      </div>

      {!watchlist.length && <div className='w-full h-full grid place-items-center'>
        <Text variant={"h4"}>Your watchlist is empty</Text>
      </div>}
    </>
  );
}
