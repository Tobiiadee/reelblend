/** @format */

import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EmptyStateError() {
  return (
    <div className='w-full h-full flex flex-col space-y-2 items-center justify-center'>
      <div className='relative w-[20vw] aspect-square'>
        <Image
          src={"/images/error.png"}
          alt='something went wrong'
          fill
          className='object-cover'
          priority
        />
      </div>
      <div className='flex flex-col items-center space-y-1'>
        <Text variant={"h1"} className='text-foreground/50'>
          Sorry, an error has occurred
        </Text>
        <Text variant={"p"} className='text-foreground/50'>
          This is possibly caused by your network connection
        </Text>
      </div>
      <Text variant={"h5"}>
        Go back to the <Link href={"/"} className="font-semibold">Homepage</Link> or fix your connection and try again.
      </Text>
    </div>
  );
}
