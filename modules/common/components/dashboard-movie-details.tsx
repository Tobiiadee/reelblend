/** @format */

import React from "react";
import Poster from "./poster";
import Details from "./details";
import RelatedMovies from "./related-movies";

interface DashboardVideoType {
  details: tmdbMovieDetialsType;
}

export default function DashboardMovieDetails({ details }: DashboardVideoType) {
  return (
    <div className='w-full flex flex-col md:grid grid-cols-[1fr_2fr_1fr]'>
      <Poster
        poster_path={details.poster_path}
        date={details.release_date}
        time={details.runtime}
      />
      <Details
        title={details.original_title}
        genres={details.genres}
        overview={details.overview}
        id={details.id}
        type="movie"
      />
      <RelatedMovies type="movie" movieId={details.id}/>
    </div>
  );
}
