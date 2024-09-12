/** @format */

import React from "react";
import Trending from "./trending";
import TopRated from "./top-rated";
import Upcoming from "./upcoming";
import AllMovies from "./all-movies";
import NowPlayingMovies from "./movies-nowplaying";

export default function MovieMain() {
  return (
    <>
      <div className='flex flex-col space-y-8'>
        <Trending />
        <NowPlayingMovies />
        <TopRated />
        <Upcoming />
      </div>
      <AllMovies />
      
    </>
  );
}
