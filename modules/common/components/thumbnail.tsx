/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";

export default function Thumbnail() {
  return (
    <div className='relative flex md:flex-col items-center md:items-start space-x-6 md:space-y-10'>
      <div className='relative w-28 h-36 rounded-lg overflow-hidden'>
        <Image src={"/images/v1.jpg"} alt='' fill className='object-cover' />
      </div>

      <div className='flex flex-col space-y-0'>
        <Text variant={"h5"}>2021</Text>
        <Text variant={"h5"}>1HR 13MINS</Text>
        <Text variant={"h5"}>PG 13</Text>
      </div>
    </div>
  );
}
