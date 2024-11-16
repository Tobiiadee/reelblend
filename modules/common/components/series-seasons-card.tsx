/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { Star } from "lucide-react";
import { convertDate } from "@/lib/helpers/helpers";
import { Separator } from "../ui/separator";


interface RelatedMovieProps {
  details: tmdbMovieResponse;
  type: string;
}

export default function SeriesSeasonsCard({
  details,
  type,
}: RelatedMovieProps) {
    
  return (
    <div>
      <div className='flex flex-col w-full space-y-2'>
        <div className='relative w-52 aspect-video rounded-lg flex justify-center items-center overflow-hidden'>
          <Image
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt=''
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <Text variant={"p"} className='font-medium capitalize w-[15ch]'>
            {details.name}
          </Text>
          <div className='flex items-center space-x-4'>
            <div className='flex space-x-2 items-center'>
              <Star
                size={16}
                strokeWidth={1.5}
                color='#dc7633'
                fill='#dc7633'
              />
              <span className='text-sm'>{details.vote_average.toFixed(1)}</span>
            </div>

            <div className="h-4">
                <Separator orientation="vertical"  className="bg-foreground/50"/>
            </div>

            <Text variant={"p"}>{convertDate(details.air_date)}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
