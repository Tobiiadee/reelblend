/** @format */

import { Separator } from "@radix-ui/react-separator";
import { Filter, ListFilter } from "lucide-react";
import React from "react";

export default function MovieFilterMenu() {
  return (
    <div className='w-[5rem] rounded-xl flex items-center justify-between px-3 py-2 bg-foreground text-background'>
      <ListFilter size={15}/>
      <Separator orientation="horizontal" className="h-full"/>
      <Filter size={15}/>
    </div>
  );
}
