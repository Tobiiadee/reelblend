/** @format */

import React from "react";
import { Text } from "./text";
import VideoTags from "./video-tags";
import DetailsActions from "./video-actions";
import Storyline from "./storyline";
import Casts from "./casts";

interface SeriesDetailsProps {
  title: string;
  genres: [{ id: number; name: string }];
  overview: string;
  id: number;
  type: "movie" | "series"
}

export default function SeriesDetails({
  title,
  genres,
  overview,
  id,
  type
}: SeriesDetailsProps) {
  return (
    <div className='w-full flex flex-col space-y-10 mt-6 md:mt-0'>
      <div className='flex flex-col space-y-4'>
        <Text variant={"h2"}>{title}</Text>
        <div className='flex space-x-3'>
          {genres?.map((genre) => (
            <VideoTags key={genre.id} name={genre.name} />
          ))}
        </div>
        <DetailsActions type={type} id={id} />
      </div>

      <div className='w-full flex flex-col md:grid grid-cols-3 gap-16 mt-6'>
        <Storyline overview={overview} />
        {/* <div
          id='hide-scrollbar'
          className='w-full overflow-x-scroll flex items-center'>
          <Casts />
        </div> */}
      </div>
    </div>
  );
}
