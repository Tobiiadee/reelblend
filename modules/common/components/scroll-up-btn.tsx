/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUpFromDot } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollUpBtn() {
  const [scroll, setScroll] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScroll(scrollTop > 80);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {scroll && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.5 }}
            className='fixed bottom-8 right-2 '>
            <Button
              onClick={handleClick}
              variant={"default"}
              className='shadow-md rounded-full px-2 py-7 '>
              <ArrowUpFromDot />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
