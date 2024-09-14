/** @format */

import PaginationSeries from "@/layout/components/pagination-series";
import SeriesPaginationNav from "@/layout/components/series-pagination-nav";
import { Text } from "@/modules/common/components/text";
import React, { Suspense } from "react";

export default function Series() {
  return (
    <>
      <div className=''>
        <Text variant={"h3"} className='text-bold my-6'>
          All Series
        </Text>
        <PaginationSeries />
      </div>
      <Suspense>
        <SeriesPaginationNav />
      </Suspense>
    </>
  );
}
