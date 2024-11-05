/** @format */

"use client";

import { Text } from "@/modules/common/components/text";
import React, { useEffect, useRef, useState } from "react";
import TopBarSearchComp from "../components/topbar-search-comp";
import TopBarAdmin from "../components/topbar-admin";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import SearchMovieInput from "@/modules/common/components/search-movie-input";
import SearchMovieResults from "@/modules/common/components/search-movie-results";
import { Button } from "@/modules/common/ui/button";
import { Menu } from "lucide-react";
import MobileDrawer from "@/modules/common/components/mobile-drawer";
import Logo from "@/modules/common/ui/logo";
import SignInSlide from "../components/sign-in-slide";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Image from "next/image";

export default function TopBar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLButtonElement>(null);

  const [userOnAuth, setUserOnAuth] = useState(false);

  const [user] = useAuthState(auth);

  const openSearchHandler = () => {
    setOpenSearch((prev) => !prev);
    if (!searchRef.current) return;
    searchRef.current.click();
    // console.log(searchRef.current);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if 'Ctrl + K' is pressed
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent default behavior
        setOpenSearch(true); // Open the search bar
      }
    };

    // Attach the event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 30); // You can adjust the value to control when the class is applied
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Wait for Firebase auth to ensure the user is available
    const waitForAuth = async () =>
      new Promise<void>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            resolve();
          } else {
            reject(new Error("User not authenticated"));
          }
          unsubscribe(); // Clean up the listener
        });
      });

    waitForAuth();

    // const user = auth.currentUser;

    if (!user) {
      setUserOnAuth(true);
    } else {
      setUserOnAuth(false);
    }
  }, [user]);

  const mobileDrawerHandler = () => {
    if (!mobileDrawerRef.current) return;
    mobileDrawerRef.current.click();
  };

  return (
    <>
      <div
        className={`fixed ${
          scrolled ? "backdrop-blur-md md:pl-10" : ""
        } top-0 left-0 lg:left-28 pl-6 lg:pl-0 z-30 py-3 flex justify-between items-center w-[100%] lg:w-[90%] transition-all duration-500`}>
        <div className='flex items-center space-x-4'>
          <Button
            onClick={mobileDrawerHandler}
            variant={"ghost"}
            className='px-2 lg:hidden'>
            <Menu strokeWidth={1.5} />
          </Button>
          <Logo />
        </div>

        <div className='w-full max-w-[40vw] flex justify-end lg:justify-center'>
          <AnimatePresence mode='wait'>
            {!openSearch && (
              <TopBarSearchComp
                openSearch={openSearchHandler}
                search={openSearch}
              />
            )}
          </AnimatePresence>

          <SearchMovieResults
            triggerRef={searchRef}
            closeSearch={setOpenSearch}
          />
        </div>

        <TopBarAdmin />

        <MobileDrawer trigger={mobileDrawerRef} />
      </div>
      {openSearch && (
        <SearchMovieInput search={openSearch} setSearch={setOpenSearch} />
      )}
    </>
  );
}
