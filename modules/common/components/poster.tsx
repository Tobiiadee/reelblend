/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { convertDate, convertToHoursAndMinutes } from "@/lib/helpers/helpers";

interface PosterType {
  poster_path: string
  date: string;
  time: number;
}

export default function Poster({poster_path, date, time}:PosterType) {
  
  return (
    <div className='relative flex md:flex-col items-center md:items-start space-x-6 md:space-y-4'>
      <div className='relative w-28 h-36 rounded-lg overflow-hidden'>
        <Image src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt='' fill className='object-cover' />
      </div>

      <div className='flex flex-col space-y-0'>
        <Text variant={"h5"}>{convertDate(date)}</Text>
        <Text variant={"h5"}>{convertToHoursAndMinutes(time)}</Text>
      </div>
    </div>
  );
}
