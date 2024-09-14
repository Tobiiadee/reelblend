/** @format */

"use client";

import React, { useMemo } from "react";
import MovieCard from "@/layout/components/movie-card";
import { getSearchedKeyword } from "@/lib/services/tmdb-services";
import MovieSkeleton from "@/modules/common/components/movie-skeleton";
import { Text } from "@/modules/common/components/text";
import useKeywordStore from "@/modules/store/keyword-store";
import useTypeStateStore from "@/modules/store/set-type-store";
import { useQuery } from "@tanstack/react-query";
import EmptyStateError from "@/modules/common/ui/empty-states/empty-state-error";

export default function SearchPage() {
  const { typeState } = useTypeStateStore();
  const { keyword } = useKeywordStore();

  // Use useMemo to optimize type and cardType calculation
  const type = useMemo(
    () => (typeState === "series" ? "tv" : "movie"),
    [typeState]
  );
  const cardType = useMemo(
    () => (typeState === "series" ? "series" : "movie"),
    [typeState]
  );

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-search", keyword],
    queryFn: () => getSearchedKeyword(keyword, type),
    enabled: !!keyword,
  });

  return (
    <div className='w-full min-h-screen'>
      <div className='my-6'>
        <Text variant='h3' className='font-bold'>
          {`Search results for: "${keyword}"`}
        </Text>
      </div>

      {/* Handle loading state */}
      {isLoading && (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Handle error state */}
      {error && <EmptyStateError />}

      {/* Handle empty results */}
      {!isLoading && searchResults?.results.length === 0 && (
        <div className='text-center mt-10'>
          <Text variant='p'>No results found for &#39;{keyword}&#39;.</Text>
        </div>
      )}

      {/* Render search results */}
      {!isLoading && searchResults && searchResults?.results.length > 0 && (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full md:pl-6'>
          {searchResults?.results.map((result) => (
            <MovieCard
              key={result.id}
              posterPath={result.poster_path}
              year={
                typeState === "movies"
                  ? result.release_date
                  : result.first_air_date
              }
              title={result.original_title || result.name}
              id={result.id}
              rating={result.vote_average}
              type={cardType}
            />
          ))}
        </div>
      )}
    </div>
  );
}
