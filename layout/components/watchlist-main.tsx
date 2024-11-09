/** @format */

"use client";

import React, { useEffect, useState, useMemo } from "react";
import WatchlistMovies from "./watchlist-movies";
import WatchlistSeries from "./watchlist-series";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetails,
  getSeriesDetails,
} from "@/lib/services/tmdb-services";
import getWatchlist from "@/hooks/get-watchlist";
import useWatchlistState from "@/modules/store/check-watchlist-store";
import Loader from "@/modules/common/ui/loader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { Text } from "@/modules/common/components/text";
import { AnimatePresence } from "framer-motion";

export default function WatchlistMain() {
  const [user] = useAuthState(auth);
  const { inWatchlist } = useWatchlistState();

  const { data: watchlist, isLoading: isWatchlistLoading } = useQuery({
    queryKey: ["watchlist", inWatchlist],
    queryFn: () => getWatchlist(),
  });

  const { movieIds, seriesIds } = useMemo(() => {
    const movies: string[] = [];
    const series: string[] = [];

    watchlist?.forEach((item) => {
      if (item.type === "movie") {
        movies.push(item.id.toString());
      } else if (item.type === "series") {
        series.push(item.id.toString());
      }
    });

    return { movieIds: movies, seriesIds: series };
  }, [watchlist]);

  const isEmptyWatchlist = !isWatchlistLoading && watchlist?.length === 0;

  // console.log("Watchlist Ids:", movieIds);

  if (isWatchlistLoading && user) {
    return (
      <div className='w-full h-[45vh] grid place-items-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-8'>
      {user ? (
        <>
          <AnimatePresence mode='wait'>
            <WatchlistMovies movieIds={movieIds} />

            <WatchlistSeries seriesIds={seriesIds} />
          </AnimatePresence>
          {isEmptyWatchlist && (
            <div className='w-full h-full grid place-items-center'>
              <Text variant='h4'>Your watchlist is empty</Text>
            </div>
          )}
        </>
      ) : (
        <div className='w-full h-full grid place-items-center'>
          <Text variant='h4'>You’re not signed in</Text>
        </div>
      )}
    </div>
  );
}
