/** @format */

import { Text } from "@/modules/common/components/text";
import VideoLoading from "@/modules/common/components/video-loading";
import { Button } from "@/modules/common/ui/button";
import { Separator } from "@/modules/common/ui/separator";
import { Bookmark, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import LazyLoad from "react-lazyload";

export default function MovieCard2() {
  const [fav, setFav] = useState(false);

  const onClickFav = () => setFav((prev) => !prev);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Optional: rewind to the start
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full min-w-[295px] md:min-w-[350px]  aspect-video  space-y-1 transition duration-200 cursor-pointer'>
        <Link href={"/dashboard/id"} className='w-full h-full'>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='w-full h-full rounded-xl relative overflow-hidden'>
            {/* <Image src={"/images/img2.jpg"} alt='' layout='fill' priority /> */}
            <LazyLoad offset={50} once placeholder={<VideoLoading />}>
              <video ref={videoRef} loop muted className='w-full h-full'>
                <source src='/videos/dummy1.mp4' type='video/mp4' />
              </video>
            </LazyLoad>
          </div>
        </Link>

        <div className=''>
          <Text variant={"p"}>Pikachu</Text>
        </div>

        <div className='flex space-x-2 items-center justify-between'>
          <div className='flex space-x-2 items-center w-full'>
            <div className='flex items-center space-x-1 md:space-x-2'>
              <Star fill='#dc7633' strokeWidth={0} size={18} />
              <Text variant={"p"}>4.6</Text>
            </div>
            <Separator orientation='vertical' />
            <div>
              <Text variant={"p"}>2023</Text>
            </div>
          </div>

          <Button
            onClick={onClickFav}
            variant={"ghost"}
            className='bg-none hover:bg-transparent active:scale-75 transition-all duration-300'>
            <Bookmark
              size={20}
              strokeWidth={1}
              color='#f84531'
              fill={fav ? "#f84531" : "transparent"}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
