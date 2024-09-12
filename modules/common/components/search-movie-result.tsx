/** @format */

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { useRouter } from "next/navigation";

export default function SearchMovieResult({
  closeSearch,
}: {
  closeSearch: (action: boolean) => void;
}) {

  const router = useRouter()


  const closeSearchhandler = () => {
    closeSearch(false);
    router.replace("./dashboard/2")
  };

  return (
    <div
      onClick={closeSearchhandler}
      className='flex space-x-4 items-start'>
      <div className='w-9 aspect-square rounded-sm relative overflow-hidden'>
        <Image
          src={"/images/img1.jpg"}
          alt=''
          fill
          className='object-fit'
          priority
        />
      </div>

      <Text variant={"p"} className='capitalize mt-2'>
        The Old Gaurd
      </Text>
    </div>
  );
}
