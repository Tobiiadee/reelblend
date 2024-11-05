/** @format */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Text } from "./text";
import Modal from "../ui/modal";
import { useQuery } from "@tanstack/react-query";
import { getSearchedKeyword } from "@/lib/services/tmdb-services";
import { debounce } from "lodash";
import useTypeStateStore from "@/modules/store/set-type-store";
import useKeywordStore from "@/modules/store/keyword-store";

const AnimVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: { duration: 1 },
  },
};

export default function SearchMovieInput({
  setSearch,
  search,
}: {
  setSearch: (action: boolean) => void;
  search: boolean;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setKeyword, keyword } = useKeywordStore();

  const [searchKeyWord, setSearchKeyword] = useState<string>("");
  const { typeState } = useTypeStateStore();

  useEffect(() => {
    if (search === true) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, []);

  // Debounce search input to reduce API calls
  const debouncedSearchKeyWord = debounce((value: string) => {
    if (value === "") return;
    setSearchKeyword(value.trim());
    setKeyword(value.trim());
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
    setSearch(false);
  };

  // console.log(searchResults);

  const closeSearchHandler = () => {
    setSearch(false);
  };

  return (
    <>
      {search && (
        <Modal onClose={closeSearchHandler} isOpen={search}>
          <motion.div
            variants={AnimVariant}
            initial='initial'
            animate='animate'
            exit='exit'
            className='fixed z-50 w-[50vw] max-w-[50rem] top-8 left-1/2 transform -translate-x-1/2  bg-background border border-foreground/20 shadow-md flex flex-col space-y-3 px-2 pb-4 pt-1 rounded-b-lg'>
            <form
              onSubmit={searchHandler}
              className='w-full flex space-x-1 bg-transparent items-center border-b border-foreground/20 pl-4'>
              <input
                onChange={(e) => debouncedSearchKeyWord(e.target.value)}
                ref={inputRef}
                id='search-movie'
                placeholder={`Search for a ${typeState}`}
                className='w-full border-none outline-none text-[14px] bg-transparent placeholder:text-foreground/50 placeholder:text-[14px]'
                aria-label='Search for a movie'
              />
              <Button
                type='submit'
                disabled={
                  searchKeyWord === "" || !searchResults?.results?.length
                }
                variant={"ghost"}
                className='rounded-full py-2.5 px-2.5'
                aria-label='Search button'>
                <Search
                  strokeWidth={2}
                  size={16}
                  className='group-active:scale-90 transition-all duration-300'
                />
              </Button>
            </form>

            <div className='w-full'>
              <Text variant={"p"} className='italic font-medium'>
                For better search results, ensure you&#39;re on the right tab.
                e.g &#39;{typeState}&#39;
              </Text>
            </div>

            <SearchResults
              searchResults={searchResults}
              isLoading={isLoading}
              isError={isError}
              type={typeState}
              closeModal={closeSearchHandler}
            />
          </motion.div>
        </Modal>
      )}
    </>
  );
}

// Separate SearchResults component for clarity
function SearchResults({
  searchResults,
  isLoading,
  isError,
  type,
  closeModal,
}: {
  searchResults: tmdbResultResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  type: "movies" | "series";
  closeModal: () => void;
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
    <div className='w-full h-max max-h-[50vh] min-h-10 overflow-y-auto'>
      <div className='w-full h-full flex flex-col'>
        {searchResults?.results.map((result) => (
          <SearchInputResults
            closeModal={closeModal}
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
