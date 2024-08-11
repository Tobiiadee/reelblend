/** @format */

import Search from "@/modules/common/components/search";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import React from "react";

export default function TopBarSearchComp({
  openSearch,
  search
}: {
  openSearch: () => void;
  search: boolean
}) {
  return (
    <div className='w-[18rem] hidden md:flex items-center justify-between rounded-3xl bg-foreground pl-3 py-0.5'>
      <Button
        variant={"link"}
        className='text-[#6f7377] focus:text-background hover:text-background'>
        <Text variant={"p"} className='font-semibold'>
          Movie
        </Text>
      </Button>
      <Button
        variant={"link"}
        className='text-[#6f7377] focus:text-background hover:text-background'>
        <Text variant={"p"} className='font-semibold'>
          Series
        </Text>
      </Button>
      <Button
        variant={"link"}
        className='text-[#6f7377] focus:text-background hover:text-background'>
        <Text variant={"p"} className='font-semibold'>
          Originals
        </Text>
      </Button>
      <Search onClick={openSearch} search={search}/>
    </div>
  );
}
