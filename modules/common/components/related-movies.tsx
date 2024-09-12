/** @format */

import React from "react";
import RelatedMovie from "./related-movie";
import { Text } from "./text";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const MovieSrcArray = [
  "/images/v1.jpg",
  "/images/v2.jpg",
  "/images/v3.jpg",
  "/images/v4.jpg",
  "/images/v5.jpg",
  "/images/v6.jpg",
];

export default function RelatedMovies() {
  return (
    <div className='flex justify-between mt-8 md:mt-0 overflow-hidden'>
      <Separator orientation='vertical' className='hidden md:block' />

      <div className='flex flex-col space-y-6 w-full md:w-max'>
        <div className="md:px-4">
          <Text variant={"p"} className='font-semibold'>
            Related Movies
          </Text>
        </div>

        <div
          id='hide-scrollbar'
          className='w-full md:w-max flex md:flex-col items-center md:items-start p-4 md:space-y-6 overflow-x-scroll'>
          {MovieSrcArray.map((src, i) => (
            <RelatedMovie key={i} thumbnail={src} />
          ))}
        </div>

        <div className='w-full flex md:justify-end'>
          <Button variant={"link"} className='hover:underline'>
            <Text variant={"p"}>View More</Text>
          </Button>
        </div>
      </div>
    </div>
  );
}
