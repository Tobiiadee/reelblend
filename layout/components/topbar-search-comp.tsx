/** @format */
"use client";

import Search from "@/modules/common/components/search";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import React, { useEffect } from "react";
import MobileSearch from "./mobile-search";
import { motion, Variants } from "framer-motion";
import useTypeStateStore from "@/modules/store/set-type-store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const AnimVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export default function TopBarSearchComp({
  openSearch,
  search,
}: {
  openSearch: () => void;
  search: boolean;
}) {
  const { setTypeState, typeState } = useTypeStateStore();
  const path = usePathname();
  const router = useRouter();


  useEffect(() => {
    const redirectTo = (target: string) => {
      if (path !== "/" && !path.includes(target)) {
        router.push(`/${target}`);
      }
    };

    if (typeState === "movies") {
      redirectTo("movies?page=1");
    } else if (typeState === "series") {
      redirectTo("series?page=1");
    }
  }, [typeState]);

  return (
    <>
      <motion.div
        variants={AnimVariant}
        initial='initial'
        animate='animate'
        exit='exit'
        className='w-[22rem] hidden md:flex items-center justify-between rounded-3xl bg-foreground pl-3 py-0.5'>
        <Button
          onClick={() => {
            setTypeState("movies");
          }}
          variant={"link"}
          className={`text-[#6f7377] ${
            typeState === "movies" ? "text-background" : ""
          } hover:text-background`}>
          <Text variant={"p"} className='font-semibold'>
            Movie
          </Text>
        </Button>
        <Button
          onClick={() => setTypeState("series")}
          variant={"link"}
          className={`text-[#6f7377] ${
            typeState === "series" ? "text-background" : ""
          } hover:text-background`}>
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
        <Search searchAction={openSearch} />
      </motion.div>
      <MobileSearch />
    </>
  );
}
