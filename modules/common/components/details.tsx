/** @format */

import React from "react";
import { Text } from "./text";
import VideoTags from "./video-tags";
import VideoActions from "./video-actions";
import Storyline from "./storyline";
import Casts from "./casts";

export default function Details() {
  return (
    <div className='w-full flex flex-col space-y-10 mt-6 md:mt-0'>
      <div className='flex flex-col space-y-4'>
        <Text variant={"h2"}>Venom 2: Let The be Carnage</Text>
        <div className='flex space-x-3'>
          <VideoTags />
          <VideoTags />
          <VideoTags />
        </div>
        <VideoActions />
      </div>

      <div className='w-full flex flex-col md:grid grid-cols-3 gap-16 mt-6'>
        <Storyline />
        <div id="hide-scrollbar" className="w-full overflow-x-scroll flex items-center">
          <Casts />
        </div>
      </div>
    </div>
  );
}
