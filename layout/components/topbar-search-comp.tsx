/** @format */
"use client";

import Search from "@/modules/common/components/search";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import React, { useEffect, useState } from "react";
import MobileSearch from "./mobile-search";
import { motion, Variants } from "framer-motion";
import useTypeStateStore from "@/modules/store/set-type-store";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import usePaginationStore from "@/modules/store/pagination-store";



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
  const { pageNumber } = usePaginationStore();

  const [isDashboardSeriesPath, setIsDashboardSeriesPath] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (typeof window !== "undefined") {
      setIsDashboardSeriesPath(
        currentPath.includes(`/dashboard/${"movies" || "series"}`)
      );
    }
  }, []);

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
          disabled={!!isDashboardSeriesPath}
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
          disabled={!!isDashboardSeriesPath}
          className={`text-[#6f7377] ${
            typeState === "series" ? "text-background" : ""
          } hover:text-background`}>
          <Text variant={"p"} className='font-semibold'>
            Series
          </Text>
        </Button>
        <Button
          disabled
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
