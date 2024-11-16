/** @format */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Ellipsis, Heart, Play, Share2, TrashIcon } from "lucide-react";
import { Text } from "./text";
import { useQuery } from "@tanstack/react-query";
import { getMovieTrailer } from "@/lib/services/tmdb-services";
import Link from "next/link";
import { shareOrCopyLink } from "@/lib/helpers/helpers";
import FavButton from "@/layout/components/fav-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";

export default function DetailsActions({
  id,
  type,
  title,
}: {
  id: number;
  type: "movie" | "series";
  title: string;
}) {
  const copyHandler = () => {
    const currentPath = window.location.href;
    // console.log(currentPath);
    shareOrCopyLink(currentPath);
  };

  const { data: trailers } = useQuery({
    queryKey: ["movie-trailer"],
    queryFn: () => getMovieTrailer(id, type),
  });

  const trailerKey =
    trailers &&
    trailers?.results
      .filter((trailer) => trailer.name === "Official Trailer")
      .map((trailer) => trailer.key);

  const isDisabled = trailerKey && trailerKey.length > 0;

  return (
    <div className='flex items-center space-x-2'>
      <Button
        asChild={isDisabled}
        variant={"default"}
        disabled={!isDisabled}
        className='w-36 rounded-2xl py-5 flex items-center space-x-6'>
        <Link
          href={`https://www.youtube.com/watch?v=${trailerKey}`}
          target='blank'>
          {/* <Play size={16} strokeWidth={1.5} /> */}
          <Text variant={"p"}>Watch Trailer</Text>
        </Link>
      </Button>

      <FavButton isDetail title={title} id={id} type={type} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={copyHandler}
              className='cursor-pointer w-10 aspect-square hover:bg-transparent group border-2 px-1.5 flex items-center justify-center rounded-full'>
              <Share2
                size={20}
                strokeWidth={1.5}
                className='group-active:scale-90 transition-all duration-200'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <Text variant={"p"} className='text-[10px]'>
              Share movie
            </Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
