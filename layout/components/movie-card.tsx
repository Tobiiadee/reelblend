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
import useWatchlistStore from "@/modules/store/watchlist-store";

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
  const [fav, setFav] = useState(false);
  const [addWatchlist, setAddWatchlist] = useState(false);
  const { addToWatchlist } = useWatchlistStore();

  const onClickFav = () => setFav((prev) => !prev);
  const movieYear = convertDate(year as string);
  const movieRating =
    typeof rating === "number" && !isNaN(rating) ? rating.toFixed(1) : "N/A";

  if (addWatchlist) toast.success("Movie added to watchlist");

  const setWatchlistHandler = () => {
    addToWatchlist({id, title})
    setAddWatchlist(prev => !prev)
  };
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

          <FavButton
            onClickFav={setWatchlistHandler}
            fav={fav}
            isWatchlist={addWatchlist}
          />
        </div>
      </div>
    </div>
  );
}

function FavButton({
  isWatchlist,
  onClickFav,
  fav,
}: {
  onClickFav: () => void;
  fav: boolean;
  isWatchlist?: boolean;
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
              fill={isWatchlist ? "#f84531" : "transparent"}
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
              Remove from watchlist
            </Text>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
