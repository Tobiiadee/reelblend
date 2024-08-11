/** @format */

import { Text } from "@/modules/common/components/text";
import { Separator } from "@/modules/common/ui/separator";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function MovieCard() {
  return (
    <div className='flex flex-col space-y-2 md:hover:scale-105 md:active:scale-100 transition duration-200 cursor-pointer'>
      <div className='w-full h-[15rem] shadow-2xl rounded-xl relative overflow-hidden'>
        <Image src={"/images/img2.jpg"} alt='' layout='fill' />
      </div>

      <div className=''>
        <Text variant={"p"}>Pikachu</Text>
      </div>
      <div className='flex space-x-2 items-center'>
        <div className='flex items-center space-x-2'>
          <Star fill='#dc7633' strokeWidth={0} size={18} />
          <Text variant={"p"}>4.6</Text>
        </div>
        <Separator orientation="vertical"/>
        <div>
          <Text variant={"p"}>2023</Text>
        </div>
      </div>
    </div>
  );
}
