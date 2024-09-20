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

export default function WatchlistMain() {
  const [user] = useAuthState(auth);
  const { inWatchlist } = useWatchlistState();

  const { data: watchlist, isLoading: isWatchlistLoading } = useQuery({
    queryKey: ["watchlist", inWatchlist],
    queryFn: getWatchlist,
    staleTime: 0,
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

  const { data: movieWatchlist, isLoading: moviesLoading } = useQuery({
    queryKey: ["watchlist", "movies"],
    queryFn: () => Promise.all(movieIds.map(getMovieDetails)),
    enabled: movieIds.length > 0,
  });

  const { data: seriesWatchlist, isLoading: seriesLoading } = useQuery({
    queryKey: ["watchlist", "series"],
    queryFn: () => Promise.all(seriesIds.map(getSeriesDetails)),
    enabled: seriesIds.length > 0,
  });

  const isEmptyWatchlist = !isWatchlistLoading && watchlist?.length === 0;

  return (
    <div className='flex flex-col space-y-8'>
      {/* Loading State */}
      {isWatchlistLoading && user && (
        <div className='w-full h-[45vh] grid place-items-center'>
          <Loader />
        </div>
      )}

      {/* Watchlist Movies */}
      {!isWatchlistLoading &&
        user &&
        movieWatchlist &&
        movieWatchlist?.length > 0 && (
          <WatchlistMovies
            watchlist={movieWatchlist}
            isLoading={moviesLoading}
          />
        )}

      {/* Watchlist Series */}
      {!isWatchlistLoading &&
        user &&
        seriesWatchlist &&
        seriesWatchlist?.length > 0 && (
          <WatchlistSeries
            watchlist={seriesWatchlist}
            isLoading={seriesLoading}
          />
        )}

      {/* Empty Watchlist */}
      {isEmptyWatchlist && (
        <div className='w-full h-full grid place-items-center'>
          <Text variant='h4'>Your watchlist is empty</Text>
        </div>
      )}

      {/* Not Signed In */}
      {!user && (
        <div className='w-full h-full grid place-items-center'>
          <Text variant='h4'>You&rsquo;re not signed in</Text>
        </div>
      )}
    </div>
  );
}
