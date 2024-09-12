/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { Star } from "lucide-react";

interface RelatedMovieProps {
  thumbnail: string;
  title?: string;
  rating?: number;
  year?: string;
}

export default function RelatedMovie({ thumbnail }: RelatedMovieProps) {
  return (
    <div className='flex space-x-4 cursor-pointer md:hover:scale-105 active:scale-100 transition-all duration-300'>
      <div className='relative w-16 h-24 rounded-lg flex justify-center items-center overflow-hidden'>
        <Image src={thumbnail} alt='' fill className='object-cover' priority/>
      </div>
      <div className='flex flex-col space-y-4'>
        <Text variant={"p"} className='font-medium capitalize w-[15ch]'>
          Avengers: Age of ultron
        </Text>
        <div className='flex items-center space-x-4'>
          <div className='flex space-x-2 items-center'>
            <Star size={16} strokeWidth={1.5} color='#dc7633' fill='#dc7633' />
            <span className='text-sm'>4.7</span>
          </div>

          <Text variant={"p"}>2023</Text>
        </div>
      </div>
    </div>
  );
}
