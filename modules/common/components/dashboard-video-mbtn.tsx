/** @format */

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { Text } from "./text";

export default function DashboardVideoMbtn() {
  return (
    <div className='w-full self-end px-10 py-3 flex items-center justify-between'>
      <div className='flex items-center space-x-4'>
        <Button
          variant={"ghost"}
          className='group hover:text-white hover:bg-transparent flex space-x-4 items-center'>
          <div className='group-active:scale-90 transition-all duration-300 flex items-center justify-center text-white p-1 rounded-full border'>
            <ChevronLeft size={20} strokeWidth={1.5} />
          </div>

          <Text variant={"p"} className='capitalize text-white font-semibold'>
            Let there be carnage
          </Text>
        </Button>
      </div>

      <Button
        variant={"ghost"}
        className='hover:text-white hover:bg-white/30 active:bg-white/20 font-semibold bg-white/40 w-24 px-0 py-4 rounded-3xl text-white transition duration-300'>
        Movies
      </Button>
    </div>
  );
}
