/** @format */

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/common/ui/sheet";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/components/text";
import { Search } from "lucide-react";

interface DrawerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  side: "top" | "bottom" | "left" | "right" | null | undefined;
  optionalComponent?: React.ReactNode;
}

export default function Drawer({
  children,
  title,
  description,
  side,
  optionalComponent,
}: DrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className='self-center lg:hidden text-foreground hover:bg-transparent active:scale-95 transition duration-200'>
          <div className='w-[25vw] h-8 rounded-md px-2 bg-foreground text-background border border-foreground flex items-center justify-between'>
            <Text variant={"p"} className='font-medium'>
              Search
            </Text>
            <Search size={18} strokeWidth={2} />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side={side} className='w-screen md:w-96 pb-14'>
        <SheetHeader>
          {optionalComponent}
          {title && !optionalComponent && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className='mt-10 h-full'>{children}</div>
      </SheetContent>
    </Sheet>
  );
}
