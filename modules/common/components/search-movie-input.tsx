/** @format */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Text } from "./text";
import Modal from "../ui/modal";

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
  search
}: {
  setSearch: (action: boolean) => void;
  search: boolean
  
}) {
  const router = useRouter();

  const searchHandler = () => {
    setSearch(false);
    router.push("./search");
  };

  const closeSearchHandler = () => setSearch(false);

  return (
    <Modal onClose={closeSearchHandler} isOpen={search}>
      <motion.div
        variants={AnimVariant}
        initial='initial'
        animate='animate'
        exit={"exit"}
        className='fixed z-50 w-[50vw] left-72 top-8 bg-background border border-foreground/20 shadow-md flex flex-col space-y-6 px-2 py-4 rounded-b-lg'>
        <div className='w-full flex space-x-1 bg-transparent items-center border-b border-foreground/20 pl-4'>
          <input
            id='search-movie'
            placeholder='Search for a movie'
            className='w-full border-none outline-none text-[14px] bg-transparent placeholder:text-foreground/50 placeholder:text-[14px]'
          />
          <Button
            onClick={searchHandler}
            variant={"ghost"}
            className='rounded-full py-2.5 px-2.5'>
            <Search
              strokeWidth={2}
              size={16}
              className='group-active:scale-90 transition-all duration-300'
            />
          </Button>
        </div>

        <div className='w-full h-max min-h-10'>
          <div className='w-full h-full grid place-items-center'>
            <Text variant={"p"}>No Results</Text>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
