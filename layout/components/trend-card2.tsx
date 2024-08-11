/** @format */

import { Text } from "@/modules/common/components/text";
import Image from "next/image";
import React from "react";

export default function TrendCard2() {
  return (
    <div className='w-full h-[18rem] shadow-2xl rounded-xl relative overflow-hidden'>
      <Image src={"/images/img1.jpg"} alt='' layout="fill" objectFit='cover' />
      <div className='absolute top-0 left-0 w-full h-full bg-black/20 p-6'>
        <div className='w-[40%]'>
          <Text variant={"h2"} className='capitlize text-white'>
            The adventure of the blue sword
          </Text>
        </div>
      </div>
    </div>
  );
}
