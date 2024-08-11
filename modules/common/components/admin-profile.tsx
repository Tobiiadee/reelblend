/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { ChevronDown } from "lucide-react";

export default function AdminProfile() {
  return (
    <div className='flex items-center'>
      <div className='rounded-full w-10 aspect-square flex justify-center items-center shadow-md relative overflow-hidden'>
        <Image src={"/images/profile.jpg"} alt='' objectFit='cover' layout='fill' />
      </div>
    </div>
  );
}
