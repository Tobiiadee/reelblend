/** @format */

import MovieCard from "@/layout/components/movie-card";
import MovieSelect from "@/layout/components/movie-select";
import SearchComp from "@/modules/common/components/search-comp";

export default function Home() {
  return (
    <main className=''>
      {/* <SearchComp /> */}
      <div className=''>
        <MovieSelect />
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 w-full'>
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCard key={i} />
        ))}
      </div>
    </main>
  );
}
