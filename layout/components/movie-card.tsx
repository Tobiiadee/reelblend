/** @format */

"use client";

import { convertDate, modTitle } from "@/lib/helpers/helpers";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import { Separator } from "@/modules/common/ui/separator";
import { Bookmark, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { toast } from "sonner";

interface MovieCardProps {
  posterPath: string;
  title: string;
  year: string;
  id: number;
  rating: number;
  type: "movie" | "series";
}

export default function MovieCard({
  posterPath,
  rating,
  title,
  year,
  id,
  type,
}: MovieCardProps) {
  const [fav, setFav] = useState(false);

  // const movieTitle = modTitle(title);

  const onClickFav = () => setFav((prev) => !prev);
  const movieYear = convertDate(year as string);
  const movieRating =
    typeof rating === "number" && !isNaN(rating) ? rating.toFixed(1) : "N/A";

  if (fav === true) toast.success("Movie added to watchlist");

  return (
    <div className='w-full relative group'>
      <div className='flex flex-col w-full min-w-[300px] md:min-w-[280px] lg:min-w-[220px] aspect-video  space-y-1 transition duration-200'>
        <Link
          href={`/dashboard/${
            type === "series" ? "series" : "movies"
          }/${id}?title=${encodeURIComponent(title)}`}
          className='w-full h-full'>
          <div className='w-full h-full rounded-lg relative overflow-hidden'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
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

          <FavButton onClickFav={onClickFav} fav={fav} />
        </div>
      </div>
    </div>
  );
}

function FavButton({
  onClickFav,
  fav,
}: {
  onClickFav: () => void;
  fav: boolean;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={onClickFav}
            variant={"ghost"}
            className='bg-none hover:bg-transparent active:scale-75 transition-all duration-300'>
            <Heart
              size={20}
              strokeWidth={1}
              color='#f84531'
              fill={fav ? "#f84531" : "transparent"}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!fav ? (
            <Text variant={"p"} className='text-[10px]'>
              Add to watchlist
            </Text>
          ) : (
            <Text variant={"p"} className='text-[10px]'>
              Remove to watchlist
            </Text>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
