/** @format */

import Image from "next/image";
import React from "react";

export default function LogoSvg() {
  return (
    <div className='w-10 aspect-square relative overflow-hidden'>
      <Image
        src={"/images/reelblend.png"}
        alt='reelblend logo'
        fill
        className='object-cover'
      />
    </div>
  );
}
