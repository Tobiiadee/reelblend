/** @format */

"use client";

import MoviePaginationNav from "@/layout/components/movie-pagination-nav";
import PaginationMovies from "@/layout/components/pagination-movies";
import { Text } from "@/modules/common/components/text";
import React from "react";

export default function Movies() {
  return (
    <>
      <div className=''>
        <Text variant={"h3"} className='text-bold my-6'>
          All Movies
        </Text>
        <PaginationMovies />
      </div>

      <MoviePaginationNav />
    </>
  );
}
