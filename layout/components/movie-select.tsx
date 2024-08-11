/** @format */

"use client"

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className='flex flex-col space-y-4 md:flex-row items-center md:justify-between relative'>
      <div className='relative w-full md:w-4/5'>
        {showLeft && (
          <Button
            variant={"ghost"}
            className='absolute -left-10 top-[20%] py-2 px-1.5 rounded-full'
            onClick={scrollLeft}>
            <ChevronLeft strokeWidth={1.5} />
          </Button>
        )}

        <div
          ref={scrollRef}
          className='flex items-center px-1 py-2 space-x-6 w-[95%] overflow-hidden scrollbar-hidden'>
          {movieSelectArray.map((item, index) => (
            <MovieSelectComp key={index} type={item.type} icon={item.icon} />
          ))}
        </div>

        {showRight && (
          <Button
            variant={"ghost"}
            className='absolute -right-4 md:-right-1 lg:right-2 top-[20%] py-2 px-1.5 rounded-full'
            onClick={scrollRight}>
            <ChevronRight strokeWidth={1.5} />
          </Button>
        )}
      </div>

      <div>
        <MovieFilter />
      </div>
    </div>
  );
}
