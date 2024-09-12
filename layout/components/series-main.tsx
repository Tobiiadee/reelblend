/** @format */

import React from "react";
import AllSeries from "./all-series";
import TrendingSeries from "./trending-series";
import TopRatedSeries from "./top-rated-series";
import UpcomingSeries from "./upcoming-series";
import NowPlayingSeries from "./series-nowplaying";

export default function SeriesMain() {
  return (
    <>
      <div className='flex flex-col space-y-8'>
        <TrendingSeries />
        {/* <NowPlayingSeries /> */}
        {/* <TopRatedSeries /> */}
        <UpcomingSeries />
      </div>
      <AllSeries />
    </>
  );
}
