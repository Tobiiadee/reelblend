/** @format */

import React, { RefObject } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/modules/common/ui/sheet";
import ToggleTheme from "@/layout/components/toggle-theme";
import Link from "next/link";
import { Text } from "./text";
import { Button } from "../ui/button";

interface MobileDrawerProps {
  trigger: RefObject<HTMLButtonElement>;
}

export default function MobileDrawer({ trigger }: MobileDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger ref={trigger} className='hidden'>
        Open
      </SheetTrigger>
      <SheetContent className='pb-14'>
        <SheetHeader>
          <SheetTitle className='sr-only hidden'>Drawer title</SheetTitle>
          <SheetDescription className='sr-only hidden'>
            drawer description
          </SheetDescription>
        </SheetHeader>
        <div className='w-full min-h-full mt-8 flex flex-col justify-between items-center'>
          <div className='flex flex-col items-center space-y-8'>
          <SheetClose asChild>
              <Link href={"/movies?page=1"}>
                <Text variant={"p"}>Movies</Text>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/series?page=1"}>
                <Text variant={"p"}>Series</Text>
              </Link>
            </SheetClose>
          </div>
          <div className='flex flex-col items-center space-y-8'>
            <SheetClose asChild>
              <Link href={"/"}>
                <Text variant={"p"}>Home</Text>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/"}>
                <Text variant={"p"}>Watchlist</Text>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/"}>
                <Text variant={"p"}>Favourite</Text>
              </Link>
            </SheetClose>

            <Button asChild>
              <Link
                href={
                  "https://portfolio10-git-main-tobi-ades-projects.vercel.app/contact"
                }
                target='blank'>
                <Text variant={"p"}>Contact Developer</Text>
              </Link>
            </Button>
          </div>
          <ToggleTheme />
        </div>
      </SheetContent>
    </Sheet>
  );
}