/** @format */

import React, { RefObject, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import useTypeStateStore from "@/modules/store/set-type-store";
import usePaginationStoreMovies from "@/modules/store/pagination-store-movies";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import useSignOut from "@/hooks/use-sign-out";

interface MobileDrawerProps {
  trigger: RefObject<HTMLButtonElement>;
}

export default function MobileDrawer({ trigger }: MobileDrawerProps) {
  const router = useRouter();
  const path = usePathname();
  const { typeState, setTypeState } = useTypeStateStore();
  const { pageNumber } = usePaginationStoreMovies();
  const [user] = useAuthState(auth);
  const { logOut } = useSignOut();

  useEffect(() => {
    const redirectTo = (target: string) => {
      // Only redirect if the current path does not include the target
      if (path !== `/${target}` && !path.includes(target)) {
        router.push(`/${target}`);
      }
    };

    // Perform redirect only if you're on the all_movies or all_series pages
    if (path.includes("all_movies") || path.includes("all_series")) {
      if (typeState === "movies" && !path.includes("all_movies")) {
        redirectTo(`all_movies?page=${pageNumber}`);
      } else if (typeState === "series" && !path.includes("all_series")) {
        redirectTo(`all_series?page=${pageNumber}`);
      }
    }
  }, [typeState, path, pageNumber, router]);

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
          <div className='flex flex-col items-center space-y-4'>
            <SheetClose
              asChild
              onClick={() => setTypeState("movies")}
              className='cursor-pointer'>
              <Text variant={"p"}>Movies</Text>
            </SheetClose>

            <SheetClose
              asChild
              onClick={() => setTypeState("series")}
              className='cursor-pointer'>
              <Text variant={"p"}>Series</Text>
            </SheetClose>
          </div>
          <div className='flex flex-col items-center space-y-4'>
            <SheetClose asChild>
              <Link href={"/"}>
                <Text variant={"p"}>Home</Text>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href={"/watchlist"}>
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

          {!user ? (
            <div className='flex flex-col items-center space-y-4'>
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Text variant={"p"}>Sign in</Text>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Text variant={"p"}>Sign up</Text>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <SheetClose onClick={() => logOut()}>
              <Text variant={"p"}>Sign out</Text>
            </SheetClose>
          )}
          <ToggleTheme className="-top-32 -left-36"/>
        </div>
      </SheetContent>
    </Sheet>
  );
}
