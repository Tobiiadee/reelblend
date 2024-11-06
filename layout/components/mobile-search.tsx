/** @format */
"use client";

import useOpenDrawer from "@/hooks/use-open-drawer";
import { Button } from "@/modules/common/ui/button";
import { Search } from "lucide-react";
import React from "react";
import Drawer from "./drawer";
import SearchComp from "@/modules/common/components/search-comp";
import { Text } from "@/modules/common/components/text";
import MobileSelectType from "./mobile-select-type";

export default function MobileSearch() {
  const { triggerRef, openDrawer } = useOpenDrawer();
  return (
    <Drawer
      side={"left"}
      optionalComponent={<MobileSelectType />}
      title='Search for a movie'>
      <SearchComp />
    </Drawer>
  );
}
