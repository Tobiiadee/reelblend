/** @format */

"use client";

import React, { useState, useRef, useEffect } from "react";
import MovieSelectComp from "./movie-select-comp";
import MovieFilter from "./movie-filter";
import {
  ChevronLeft,
  ChevronRight,
  Dog,
  Flame,
  Ghost,
  Heart,
  MoonStar,
  Pickaxe,
  Star,
} from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import useScroll from "@/hooks/use-scroll";

// Define type for movie select items
interface MovieSelectItem {
  type: string;
  icon: React.ReactNode;
}

const movieSelectArray: MovieSelectItem[] = [
  { type: "Trending", icon: <Flame /> },
  { type: "Action", icon: <Pickaxe /> },
  { type: "Romance", icon: <Heart /> },
  { type: "Animation", icon: <Dog /> },
  { type: "Horror", icon: <Ghost /> },
  { type: "Special", icon: <Star /> },
  { type: "Drakor", icon: <MoonStar /> },
];

export default function MovieSelect() {
  const { showLeft, showRight, scrollLeft, scrollRight, scrollRef } =
    useScroll();

  return (
    <div className='flex flex-col w-full space-y-4 md:flex-row md:items-center md:justify-between relative md:pl-6'>
      <div className='relative  w-[100%] md:w-[79%] '>
        {showLeft && (
          <Button
            variant={"ghost"}
            className='absolute hidden md:block -left-10 top-[20%] py-2 px-1.5 rounded-full'
            onClick={scrollLeft}>
            <ChevronLeft strokeWidth={1.5} />
          </Button>
        )}

        <div
          id='hide-scrollbar'
          ref={scrollRef}
          className='flex items-center px-1 py-2 space-x-6 w-full md:w-[95%] overflow-y-scroll'>
          {movieSelectArray.map((item, index) => (
            <MovieSelectComp key={index} type={item.type} icon={item.icon} />
          ))}
        </div>

        {showRight && (
          <Button
            variant={"ghost"}
            className='absolute hidden md:block -right-4 md:-right-1 lg:-right-1 top-[20%] py-2 px-1.5 rounded-full'
            onClick={scrollRight}>
            <ChevronRight strokeWidth={1.5} />
          </Button>
        )}
      </div>

      <div className='self-end'>
        <MovieFilter />
      </div>
    </div>
  );
}
