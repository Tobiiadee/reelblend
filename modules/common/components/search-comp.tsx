/** @format */

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { SheetClose } from "../ui/sheet";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getSearchedKeyword } from "@/lib/services/tmdb-services";
import useTypeStateStore from "@/modules/store/set-type-store";
import { Text } from "./text";
import useKeywordStore from "@/modules/store/keyword-store";

export default function SearchComp() {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [searchKeyWord, setSearchKeyword] = useState<string>("");
  const { typeState } = useTypeStateStore();
  const { keyword, setKeyword } = useKeywordStore();

  // Debounce search input to reduce API calls
  const debouncedSearchKeyWord = debounce((value: string) => {
    setSearchKeyword(value);
    setKeyword(value)
  }, 500);

  const type = typeState === "series" ? "tv" : "movie";

  // Fetch search results from API
  const {
    data: searchResults,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["search", searchKeyWord],
    queryFn: () => getSearchedKeyword(searchKeyWord, type),
    enabled: !!searchKeyWord, // Only fetch if there's a keyword
  });

  const searchHandler = () => {
    router.push(`/search?type=${typeState}?keyword=${keyword}`);
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
          onChange={(e) => debouncedSearchKeyWord(e.target.value)}
          id='search-movie'
          placeholder={`Search for ${typeState}`}
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
      <div className='w-full'>
        <Text variant={"p"} className='italic font-medium'>
          For better search results, ensure you&#39;re on the right tab. e.g &#39;
          {typeState}&#39;
        </Text>
      </div>
      <SearchResults
        searchResults={searchResults}
        isLoading={isLoading}
        isError={isError}
        type={typeState}
        closeSearch={mobileSearchHandler}
      />
      <SheetClose ref={closeRef} className='hidden sr-only'>
        close
      </SheetClose>
    </div>
  );
}

// Separate SearchResults component for clarity
function SearchResults({
  searchResults,
  isLoading,
  isError,
  type,
  closeSearch,
}: {
  searchResults: tmdbResultResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  type: "movies" | "series";
  closeSearch: () => void;
}) {
  if (isLoading) {
    return (
      <div className='w-full h-full grid place-items-center'>
        <Text variant={"p"}>Loading...</Text>
      </div>
    );
  }

  if (isError || (!searchResults?.results?.length && searchResults)) {
    return (
      <div className='w-full h-full grid place-items-center'>
        <Text variant={"p"}>
          {isError ? "Error fetching results" : "No Results"}
        </Text>
      </div>
    );
  }

  return (
    <div className='w-full h-[80%] overflow-y-auto'>
      <div className='w-full h-full flex flex-col'>
        {searchResults?.results.map((result) => (
          <SearchInputResults
            closeModal={closeSearch}
            key={result.id}
            id={result.id}
            result={
              type === "movies" ? result.original_title : result.original_name
            }
            type={type}
          />
        ))}
      </div>
    </div>
  );
}

// Result component for each search result
export function SearchInputResults({
  result,
  id,
  closeModal,
  type,
}: {
  result: string;
  id: number;
  closeModal: () => void;
  type: "movies" | "series";
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(
          `/dashboard/${type}/${id}?title=${encodeURIComponent(result)}`
        );
        closeModal();
      }}
      className='w-full py-1.5 px-2 rounded active:bg-foreground/50 hover:bg-foreground/40 hover:text-background transition-all cursor-pointer'>
      <Text variant={"p"}>{result}</Text>
    </div>
  );
}
