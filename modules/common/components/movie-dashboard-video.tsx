/** @format */

import React from "react";
import DashboardVideoNav from "./dashboard-video-nav";
import Image from "next/image";

interface DashboardVideoType {
  details: tmdbMovieDetialsType;
}

export default function MovieDashboardVideo({ details }: DashboardVideoType) {
  const backdrop =
    details.backdrop_path === "" ? details.poster_path : details.backdrop_path;   
    
    // console.log(details);
    

  return (
    <div className='rounded-lg overflow-hidden relative h-[80vh]'>
      <div className='h-full 2xl:h-full 2xl:w-full relative'>
        <Image
          src={`https://image.tmdb.org/t/p/w780${backdrop}`}
          alt=''
          fill
          className='object-cover'
          priority
        />
      </div>
      {/* <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-between bg-gradient-to-b from-black/5 to-black/80'>
        <div></div>
        <DashboardVideoMbtn />
        <DashboardVideoNav />
      </div> */}
    </div>
  );
}
