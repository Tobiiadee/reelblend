/** @format */

"use client";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Error() {
  const router = useRouter();

  return (
    <div className='w-full min-h-screen flex flex-col space-y-2 items-center justify-center'>
      <div className='relative w-[20vw] aspect-square'>
        <Image
          src={"/images/error.png"}
          alt='something went wrong'
          fill
          className='object-cover'
          priority
        />
      </div>
      <Text variant={"h3"} className='font-bold'>
        Oops.
      </Text>
      <div className='flex flex-col items-center space-y-1'>
        <Text variant={"p"} className='text-foreground/50'>
          We encontered an unexpected problem
        </Text>
      </div>
    </div>
  );
}
