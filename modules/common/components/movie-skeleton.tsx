/** @format */

import React from "react";
import { Skeleton } from "../ui/skeleton";

const MovieSkeleton = () => {
  return (
    <div className='flex flex-col space-y-2 w-full min-w-[300px] md:min-w-[280px] lg:min-w-[220px] aspect-video'>
      <Skeleton className='w-full h-full' />
      <div className='flex items-center justify-between'>
        <Skeleton className='w-24 h-6' />
        <Skeleton className='w-16 h-6' />
      </div>
    </div>
  );
};

export default MovieSkeleton;
