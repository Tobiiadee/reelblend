/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";

export default function Cast() {
  return (
    <div className="w-max flex space-x-2 cursor-pointer">
      <div className='relative min-w-10 aspect-square rounded-full flex items-center justify-center overflow-hidden'>
        <Image src={"/images/profile.jpg"} alt='' fill className='object-cover' />
      </div>

      <div className='w-full flex flex-col'>
        <Text variant={"p"} className='capitalize font-semibold'>
          Tom Hardy
        </Text>
        <Text variant={"p"} className='capitalize text-[12px]'>
          Eddie Brock
        </Text>
      </div>
    </div>
  );
}
