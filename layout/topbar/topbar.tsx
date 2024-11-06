/** @format */

"use client";

import React, { useEffect, useRef, useState } from "react";
import TopBarSearchComp from "../components/topbar-search-comp";
import TopBarAdmin from "../components/topbar-admin";
import { AnimatePresence } from "framer-motion";
import SearchMovieInput from "@/modules/common/components/search-movie-input";
import SearchMovieResults from "@/modules/common/components/search-movie-results";
import { Button } from "@/modules/common/ui/button";
import { Menu } from "lucide-react";
import MobileDrawer from "@/modules/common/components/mobile-drawer";
import Logo from "@/modules/common/ui/logo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { waitForAuth } from "../components/client-provider";
import VerifyEmail from "../components/verify-email";
import useEmailVerifyStore from "@/modules/store/email-verify-store";

export default function TopBar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLButtonElement>(null);

  const { emailVerify } = useEmailVerifyStore();

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
    waitForAuth();

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

  const isEmailVerified = !emailVerify && auth.currentUser;

  return (
    <>
      <div className='flex flex-col fixed top-0 left-0 lg:left-28 w-screen lg:w-[90%] z-30'>
        {isEmailVerified && <VerifyEmail />}
        <div
          className={`${
            scrolled ? "backdrop-blur-md lg:pl-10" : ""
          } top-0 px-2 sm:px-6 lg:pl-0  py-3 flex justify-between items-center transition-all duration-500 z-30`}>
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
      </div>
      {openSearch && (
        <SearchMovieInput search={openSearch} setSearch={setOpenSearch} />
      )}
    </>
  );
}
