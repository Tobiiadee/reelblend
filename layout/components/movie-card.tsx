/** @format */

"use client";

import { convertDate } from "@/lib/helpers/helpers";
import { Text } from "@/modules/common/components/text";

import { Separator } from "@/modules/common/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import SignAlert from "@/modules/common/components/sign-alert";
import { Star } from "lucide-react";
import FavButton from "./fav-button";

interface MovieCardProps {
  posterPath: string;
  title: string;
  year: string;
  id: number;
  rating: number;
  type: "movie" | "series";
  isWatchlist?: boolean;
}

export default function MovieCard({
  isWatchlist,
  posterPath,
  rating,
  title,
  year,
  id,
  type,
}: MovieCardProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const movieYear = convertDate(year as string);
  const movieRating =
    typeof rating === "number" && !isNaN(rating) ? rating.toFixed(1) : "N/A";

  return (
    <>
      <div className='w-full relative group'>
        <div className='flex flex-col w-full min-w-[300px] md:min-w-[280px] lg:min-w-[220px] aspect-video  space-y-1 transition duration-200'>
          <Link
            href={`/dashboard/${
              type === "series" ? "series" : "movies"
            }/${id}?title=${encodeURI(title)}`}
            className='w-full h-full'>
            <div className='w-full h-full rounded-lg relative overflow-hidden'>
              <Image
                src={
                  posterPath !== null
                    ? `https://image.tmdb.org/t/p/w500${posterPath}`
                    : "/images/dummy-flag.png"
                }
                alt={`poster for ${title}`}
                fill
                className='object-cover'
                priority
              />
            </div>
          </Link>

          <div className=''>
            <Text variant={"p"} className='font-medium'>
              {title}
            </Text>
          </div>

          <div className='flex space-x-2 items-center justify-between'>
            <div className='flex space-x-3 items-center w-full'>
              <div className='flex items-center space-x-1 md:space-x-2'>
                <Star fill='#dc7633' strokeWidth={0} size={18} />
                <Text variant={"p"} className='font-medium'>
                  {movieRating}
                </Text>
              </div>

              <div className='h-[1.3rem]'>
                <Separator orientation='vertical' className='' />
              </div>

              <div>
                <Text variant={"p"} className='font-medium'>
                  {movieYear}
                </Text>
              </div>
            </div>

            <FavButton
              id={id}
              type={type}
              triggerRef={triggerRef}
              title={title}
            />
          </div>
        </div>
      </div>
      <SignAlert trigger={triggerRef} />
    </>
  );
}
