/** @format */

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { Text } from "./text";
import CircularProgress from "./circular-progress";

export default function DashboardVideoNav() {
  return (
    <div className='w-full self-end px-10 py-6 flex items-center justify-between'>
      <div className='flex space-x-4 items-center'>
        <CircularProgress value={70} />
        <Text variant={"h5"} className='font-semibold text-white'>
          3.5k Upvotes
        </Text>
      </div>

      <Button
        variant={"ghost"}
        className='active:scale-90 flex space-x-4 text-white w-40 px-0 py-5 border rounded-3xl hover:text-white hover:bg-transparent transition-all duration-300'>
        <Play size={16} strokeWidth={1.5} />
        <Text variant={"p"} className='font-semibold'>
          Trailer
        </Text>
      </Button>

      <div className='flex space-x-2 items-baseline'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='w-1 aspect-square rounded-full bg-white' />
        ))}
      </div>
    </div>
  );
}
