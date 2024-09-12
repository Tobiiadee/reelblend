/** @format */

import React from "react";
import SearchMovieResult from "./search-movie-result";


export default function SearchMovieResultsMobile({
  closeSearch,
}: {
  closeSearch?: (action: boolean) => void;
}) {
  return (

      <div className='flex flex-col space-y-4 mt-4 w-full h-max rounded-lg overflow-y-auto'>
        {Array.from({ length: 3 }).map((_, i) => (
          <SearchMovieResult closeSearch={closeSearch!} key={i} />
        ))}
      </div>

  );
}
