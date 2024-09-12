/** @format */
"use client";

import useOpenDrawer from "@/hooks/use-open-drawer";
import { Button } from "@/modules/common/ui/button";
import { Search } from "lucide-react";
import React from "react";
import Drawer from "./drawer";
import SearchComp from "@/modules/common/components/search-comp";
import { Text } from "@/modules/common/components/text";

export default function MobileSearch() {
  const { triggerRef, openDrawer } = useOpenDrawer();
  return (
    <>
      <Button
        onClick={openDrawer}
        variant={"ghost"}
        className='self-end md:hidden text-foreground hover:bg-transparent active:scale-95 transition duration-200'>
        <div className='w-[25vw] h-8 rounded-md px-2 bg-foreground text-background border border-foreground flex items-center justify-between'>
          <Text variant={"p"} className="font-medium">Search</Text>
          <Search size={18} strokeWidth={2} />
        </div>
      </Button>

      <Drawer side={"left"} triggerRef={triggerRef} title='Search for a movie'>
        <SearchComp />
      </Drawer>
    </>
  );
}
