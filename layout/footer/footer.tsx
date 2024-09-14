/** @format */

import { Text } from "@/modules/common/components/text";
import { Copyright } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className='w-full h-max mt-20 flex flex-col-reverse md:flex-row items-center justify-between py-10 text-foreground/60'>
      <div className='flex space-x-4 items-center mt-4 md:mt-0'>
        <div className='flex space-x-2 items-center'>
          <Copyright size={20} strokeWidth={1.5} />
          <Text variant={"h5"} className='font-semibold -mt-1'>
            2024
          </Text>
        </div>

        <Link href={"/"}>
          <Text variant={"h3"} className='text-foreground font-serif'>
            ReelBlend
          </Text>
        </Link>
      </div>

      <div>
        <Text variant={"p"} className='italics text-[10px] text-center'>
          This service uses TMDB and the TMDB APIs but is not endorsed,
          certified, or otherwise approved by TMDB.
        </Text>
      </div>
    </div>
  );
}
