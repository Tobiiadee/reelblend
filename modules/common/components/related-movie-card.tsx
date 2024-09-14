/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { Star } from "lucide-react";
import { convertDate } from "@/lib/helpers/helpers";
import Link from "next/link";

interface RelatedMovieProps {
  details: tmdbMovieResponse;
  type: string;
}

export default function RelatedMovieCard({ details, type }: RelatedMovieProps) {
  return (
    <Link
      href={`/dashboard/${type === "series" ? "series" : "movies"}/${
        details.id
      }?title=${encodeURIComponent(
        type === "series" ? details.original_name : details.title
      )}`}>
      <div className='flex space-x-4 cursor-pointer md:hover:scale-105 active:scale-100 transition-all duration-300'>
        <div className='relative w-16 h-24 rounded-lg flex justify-center items-center overflow-hidden'>
          <Image
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt=''
            fill
            className='object-cover'
            priority
          />
        </div>
        <div className='flex flex-col space-y-4'>
          <Text variant={"p"} className='font-medium capitalize w-[15ch]'>
            {type === "movie" ? details.title : details.original_name}
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

            <Text variant={"p"}>{convertDate(details.release_date)}</Text>
          </div>
        </div>
      </div>
    </Link>
  );
}
