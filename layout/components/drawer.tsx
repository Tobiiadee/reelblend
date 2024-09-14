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


interface DrawerProps {
  triggerRef: React.RefObject<HTMLButtonElement>;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  side: "top" | "bottom" | "left" | "right" | null | undefined;
  optionalComponent?: React.ReactNode
}

export default function Drawer({
  triggerRef,
  children,
  title,
  description,
  side,
  optionalComponent
}: DrawerProps) {
  return (
    <Sheet>
      <SheetTrigger ref={triggerRef} className='hidden'>
        Open
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
