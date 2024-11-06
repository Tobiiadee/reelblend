/** @format */

import WatchlistMain from "@/layout/components/watchlist-main";
import { Text } from "@/modules/common/components/text";
import React from "react";

export default function Watchlist() {
  return (
    <div className='w-full min-h-[68vh]'>
      <Text variant={"h3"} className='text-bold my-6'>
        Your watchlist
      </Text>
      <WatchlistMain />
    </div>
  );
}
