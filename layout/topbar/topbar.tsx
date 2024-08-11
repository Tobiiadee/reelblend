/** @format */

"use client";

import { Text } from "@/modules/common/components/text";
import React, { useState } from "react";
import TopBarSearchComp from "../components/topbar-search-comp";
import TopBarAdmin from "../components/topbar-admin";
import Link from "next/link";
import SearchComp from "@/modules/common/components/search-comp";
import { AnimatePresence } from "framer-motion";

export default function TopBar() {
  const [openSearch, setOpenSearch] = useState(false);

  const openSearchHandler = () => setOpenSearch((prev) => !prev);

  return (
    <div
      className={`py-4 flex justify-between items-center w-full mt-2 relative`}>
      <Link href={"/"}>
        <Text variant={"h3"}>FindMy-Movie</Text>
      </Link>

      <TopBarSearchComp openSearch={openSearchHandler} search={openSearch} />
      <TopBarAdmin />

      <AnimatePresence>{openSearch && <SearchComp />}</AnimatePresence>
    </div>
  );
}
