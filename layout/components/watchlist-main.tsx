/** @format */

"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "./movie-card";
import { Text } from "@/modules/common/components/text";
import useWatchlistStore from "@/modules/store/watchlist-store";
import WatchlistMovies from "./watchlist-movies";
import WatchlistSeries from "./watchlist-series";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetails,
  getSeriesDetails,
} from "@/lib/services/tmdb-services";
import useGetWatchlist from "@/hooks/get-watchlist";
import getWatchlist from "@/hooks/get-watchlist";
import useWatchlistState from "@/modules/store/check-watchlist-store";
import Loader from "@/modules/common/ui/loader";

export default function WatchlistMain() {
  const [seriesIds, setSeriesIds] = useState<string[]>([]);
  const [movieIds, setMovieIds] = useState<string[]>([]);
  const { inWatchlist } = useWatchlistState();
  const {
    data: watchlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list", inWatchlist],
    queryFn: () => getWatchlist(),
    staleTime: 0,
  });

  // console.log(watchlist);

  useEffect(() => {
    // Create temporary arrays
    const tempMovieIds: string[] = [];
    const tempSeriesIds: string[] = [];

    // Split the watchlist in one loop
    watchlist?.forEach((item) => {
      if (item.type === "movie") {
        tempMovieIds.push(item.id.toString());
      } else if (item.type === "series") {
        tempSeriesIds.push(item.id.toString());
      }
    });

    // Update state only once after the loop
    setMovieIds(tempMovieIds);
    setSeriesIds(tempSeriesIds);
  }, [watchlist]);

  // Fetch movie details
  const { data: movieWatchlist, isLoading: moviesLoading } = useQuery({
    queryKey: ["watchlist", "movies"],
    queryFn: () => Promise.all(movieIds.map(getMovieDetails)),
    enabled: movieIds.length > 0, // Only run query if there are movie IDs
  });

  // Fetch series details
  const { data: seriesWatchlist, isLoading: seriesLoading } = useQuery({
    queryKey: ["watchlist", "series"],
    queryFn: () => Promise.all(seriesIds.map(getSeriesDetails)),
    enabled: seriesIds.length > 0, // Only run query if there are series IDs
  });

  return (
    <>
      {isLoading && (
        <div className='w-full h-[45vh] grid place-items-center'>
          <Loader />
        </div>
      )}

      <div className='flex flex-col space-y-8'>
        {!isLoading && movieWatchlist && movieWatchlist?.length > 0 && (
          <WatchlistMovies
            watchlist={movieWatchlist}
            isLoading={moviesLoading}
          />
        )}
        {!isLoading && seriesWatchlist && seriesWatchlist.length > 0 && (
          <WatchlistSeries
            watchlist={seriesWatchlist}
            isLoading={seriesLoading}
          />
        )}
      </div>

      {!isLoading && !watchlist?.length && (
        <div className='w-full h-full grid place-items-center'>
          <Text variant={"h4"}>Your watchlist is empty</Text>
        </div>
      )}
    </>
  );
}
