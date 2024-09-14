/** @format */

import React from "react";
import Poster from "./poster";
import Details from "./details";
import RelatedMovies from "./related-movies";

interface DashboardVideoType {
  details: tmdbSeriesDetailsType;
}

export default function DashboardSeriesDetails({
  details,
}: DashboardVideoType) {
  // console.log(details);

  const episodesRunTime = details.episode_run_time ? details.episode_run_time.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  ) : 0;

  // console.log();
  

  return (
    <div className='w-full flex flex-col md:grid grid-cols-[1fr_2fr_1fr]'>
      <Poster
        time={episodesRunTime}
        poster_path={details.poster_path}
        date={details.first_air_date}
      />
      <Details type="series" id={details.id} title={details.original_name} overview={details.overview} genres={details.genre}/>
      <RelatedMovies type="series" movieId={details.id}/>
    </div>
  );
}
