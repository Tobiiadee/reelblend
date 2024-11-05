/** @format */

import React from "react";
import SearchMovieResult from "./search-movie-result";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";

export default function SearchMovieResults({
  closeSearch,
  triggerRef,
}: {
  closeSearch: (action: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) {
  
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger ref={triggerRef} className='hidden'>
        close Search handler
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full h-max border border-red-500'>
        {Array.from({ length: 5 }).map((_, i) => (
          <DropdownMenuItem key={i} className='cursor-pointer'>
            <SearchMovieResult closeSearch={closeSearch} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

