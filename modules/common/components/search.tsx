/** @format */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { Text } from "./text";

export default function TopBarSearch({
  searchAction,
}: {
  searchAction: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={searchAction}
            variant={"ghost"}
            className={`rounded-full text-foreground group bg-background hover:text-foreground px-[0.7rem]`}>
            <Search
              size={15}
              strokeWidth={3}
              className='group-active:active:scale-90 transition-all duration-300'
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Text variant={"p"} className="text-[10px]">CTRL + K</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
