/** @format */

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import SearchMovieResultsMobile from "./search-movie-results-mobile";
import { useRouter } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export default function SearchComp() {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  const searchHandler = () => {
    router.push("./search");
    if (!closeRef.current) return;
    closeRef.current.click();
  };

  const mobileSearchHandler = () => {
    if (!closeRef.current) return;
    closeRef.current.click();
  };

  return (
    <div className='w-full h-full flex flex-col space-y-8'>
      <div className='w-full flex space-x-1 bg-transparent items-center border-b border-foreground/40 px-2'>
        <input
          id='search-movie'
          placeholder='Search for a movie'
          className='w-full border-none outline-none text-[14px] bg-transparent placeholder:text-foreground/50 placeholder:text-[14px]'
        />
        <Button
          onClick={searchHandler}
          variant={"link"}
          className='rounded-full group text-foreground py-2.5 px-2.5'>
          <Search
            strokeWidth={2}
            size={18}
            className='group-active:scale-90 transition-all duration-300'
          />
        </Button>
      </div>

      <SearchMovieResultsMobile closeSearch={mobileSearchHandler}/>
      <SheetClose ref={closeRef} className='hidden sr-only'>
        close
      </SheetClose>
    </div>
  );
}
