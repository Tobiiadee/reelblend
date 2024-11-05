/** @format */
"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Ellipsis, Heart, Play, Share2, TrashIcon } from "lucide-react";
import { Text } from "./text";
import { useQuery } from "@tanstack/react-query";
import { getMovieTrailer } from "@/lib/services/tmdb-services";
import Link from "next/link";
import { shareOrCopyLink } from "@/lib/helpers/helpers";

export default function VideoActions({
  id,
  type,
}: {
  id: number;
  type: "movie" | "series";
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

  console.log(trailers);
  

  const trailerKey = trailers && trailers?.results
    .filter((trailer) => trailer.name === "Official Trailer")
    .map((trailer) => trailer.key);

  // console.log(trailerKey);

  const isDisabled = trailerKey && trailerKey.length > 0;

  return (
    <div className='flex items-center space-x-4'>
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

      <div className='cursor-pointer group w-10 aspect-square border-2 border-[#f84531] flex items-center justify-center rounded-full'>
        <Heart
          size={18}
          color='#f84531'
          strokeWidth={1.5}
          fill='#f84531'
          className='group-active:scale-90 transition-all duration-200'
        />
      </div>

      <Button
        variant={"ghost"}
        onClick={copyHandler}
        className='cursor-pointer hover:bg-transparent group border-2 px-1.5 flex items-center justify-center rounded-full'>
        <Share2
          size={20}
          strokeWidth={1.5}
          className='group-active:scale-90 transition-all duration-200'
        />
      </Button>

      <div className='cursor-pointer group w-10 aspect-square border-2 flex items-center justify-center rounded-full'>
        <Ellipsis
          size={20}
          strokeWidth={1.5}
          className='group-active:scale-90 transition-all duration-200'
        />
      </div>
    </div>
  );
}
