/** @format */
"use client"

import MovieSelect from "@/layout/components/movie-select";
import ScrollUpBtn from "@/modules/common/components/scroll-up-btn";
import MovieMain from "@/layout/components/movie-main";
import useTypeStateStore from "@/modules/store/set-type-store";
import SeriesMain from "@/layout/components/series-main";

export default function Home() {
  const { typeState } = useTypeStateStore();
 
  

  const active = typeState === "series";

  return (
    <main id='top-one' className='relative pb-24'>
      <MovieSelect />
      {active ? <SeriesMain /> : <MovieMain />}
      <ScrollUpBtn />
    </main>
  );
}
