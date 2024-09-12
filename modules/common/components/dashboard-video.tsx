/** @format */

import React from "react";
import DashboardVideoMbtn from "./dashboard-video-mbtn";
import DashboardVideoNav from "./dashboard-video-nav";
import Image from "next/image";
import DashboardVideoDetails from "./dashboard-video-details";

export default function DashboardVideo() {
  return (
    <div className='rounded-lg overflow-hidden relative h-[80vh]'>
      <div className='h-full 2xl:h-full 2xl:w-full relative'>
        <Image
          src={"/images/v1.jpg"}
          alt=''
          fill
          className='object-cover'
          priority
        />
      </div>
      <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-between bg-gradient-to-b from-black/5 to-black/80'>
        <div></div>
        <DashboardVideoMbtn />
        <DashboardVideoNav />
      </div>
    </div>
  );
}
