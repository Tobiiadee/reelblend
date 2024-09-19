/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import Link from "next/link";

interface ProjectItemProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export default function MoreProjectItem({
  id,
  title,
  thumbnailUrl,
  url,
}: ProjectItemProps) {
  return (
    <Link
      href={title === "ReelBlend" ? "" : url}
      target={title === "ReelBlend" ? "" : "blank"}
      className='flex flex-col space-y-2 items-center max-w-20'>
      <div className='relative w-10 aspect-square rounded-full grid place-items-center overflow-hidden'>
        <Image
          src={thumbnailUrl}
          fill
          priority
          className='object-cover'
          alt=''
        />
      </div>
      <Text variant={"p"} className='capitalize text-center font-medium'>
        {title}
      </Text>
    </Link>
  );
}
