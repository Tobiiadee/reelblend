/** @format */

"use client";

import { Search } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function SearchComp() {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      animate={{ opacity: 1, x: 50 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      className='w-[40rem] absolute left-[20%] top-[100%]'>
      <div className='w-full flex space-x-1 items-center border border-r-0 border-foreground pl-4 rounded-3xl'>
        <input
          id='search-movie'
          placeholder='Search for a movie'
          className='w-full border-none outline-none text-[14px] placeholder:text-[14px]'
        />
        <Button variant={"link"} className='rounded-full bg-foreground text-background active:scale-95 transition-all duration-300 py-2.5 px-2.5'>
          <Search strokeWidth={2} size={18} />
        </Button>
      </div>
    </motion.div>
  );
}
