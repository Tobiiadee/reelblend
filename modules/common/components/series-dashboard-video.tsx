/** @format */

import React from "react";
import DashboardVideoMbtn from "./dashboard-video-mbtn";
import DashboardVideoNav from "./dashboard-video-nav";
import Image from "next/image";
import SeriesSeasons from "./series-seasons";

interface SeriesDashboardvideoType {
  details: tmdbSeriesDetailsType;
}

export default function SeriesDashboardVideo({
  details,
}: SeriesDashboardvideoType) {
  const backdrop =
    details?.backdrop_path === undefined
      ? details?.poster_path
      : details?.backdrop_path;

  const seasonDetails = details.seasons;

  return (
    <div className='md:grid grid-cols-[1fr_2fr_1fr] gap-4 w-full'>
      <div className='rounded-lg overflow-hidden relative w-full h-[80vh] col-span-2'>
        <div className='h-full 2xl:h-full 2xl:w-full relative'>
          <Image
            src={`https://image.tmdb.org/t/p/w780${backdrop}`}
            alt=''
            fill
            className='object-cover'
            priority
          />
        </div>
      </div>

      <SeriesSeasons seasonsDetails={seasonDetails} />
    </div>
  );
}
