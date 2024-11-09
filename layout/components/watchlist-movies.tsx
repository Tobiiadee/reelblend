import React from "react";
import { Text } from "@/modules/common/components/text";
import MovieCard from "./movie-card";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { motion, Variants } from "framer-motion";
import useWatchlistState from "@/modules/store/check-watchlist-store";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/lib/services/tmdb-services";

export const AnimVariants: Variants = {
  visible: { opacity: 1, transition: { duration: 0.3 } },
  hidden: { opacity: 0 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function WatchlistMovies({ movieIds }: { movieIds: string[] }) {
  const { inWatchlist } = useWatchlistState();

  const { data: movieWatchlist, isLoading: moviesLoading } = useQuery({
    queryKey: ["watchlist", "movies"],
    queryFn: () => Promise.all(movieIds.map(getMovieDetails)),
    enabled: movieIds.length > 0,
  });

  return (
    <>
      {movieWatchlist && movieWatchlist?.length > 0 && (
        <div>
          <Text variant='h5' className='font-semibold my-6'>
            Movies
          </Text>

          <div
            id='hide-scrollbar'
            className='flex space-x-1 md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6 overflow-x-scroll'>
            {moviesLoading
              ? Array.from({ length: 10 }, (_, index) => (
                  <MovieSkeleton key={index} />
                ))
              : movieWatchlist?.map((movie) => (
                  <motion.div
                    key={movie.id}
                    variants={AnimVariants}
                    initial='hidden'
                    animate='visible'
                    exit={inWatchlist ? "visible" : "exit"}
                    className='w-full'>
                    <MovieCard
                      posterPath={movie.poster_path}
                      title={movie.original_title}
                      year={movie.release_date}
                      rating={movie.vote_average}
                      id={movie.id}
                      type='movie'
                    />
                  </motion.div>
                ))}
          </div>
        </div>
      )}
    </>
  );
}
