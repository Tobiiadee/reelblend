/** @format */
"use client";

import React from "react";
import Cast from "./cast";
import useScroll from "@/hooks/use-scroll";

export default function Casts() {
  return (
    <div className='w-max relative h-max'>
      <div
        id='hide-scrollbar'
        className='w-full flex md:flex-col space-x-4 md:space-y-6 md:space-x-0 overflow-x-scroll md:overflow-hidden'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Cast key={i} />
        ))}
      </div>
    </div>
  );
}
