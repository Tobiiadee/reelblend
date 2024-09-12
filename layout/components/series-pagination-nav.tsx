/** @format */

"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/modules/common/ui/pagination";
import usePaginationStore from "@/modules/store/pagination-store";
import { getPaginationPages } from "@/lib/helpers/helpers";
import { useRouter, useSearchParams } from "next/navigation"; // Import router for programmatic navigation
import { useQuery } from "@tanstack/react-query";
import { getAllMovies, getAllSeries } from "@/lib/services/tmdb-services";

interface PaginationProps {
  totalPages?: number;
}

export default function SeriesPaginationNav() {
  const { data: allSeries } = useQuery({
    queryKey: ["series"],
    queryFn: () => getAllSeries(),
  });

  const totalPages = allSeries?.total_pages;
  const { setPageNumber, pageNumber } = usePaginationStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNav = searchParams ? searchParams.get("page") : undefined;

  const { pagesToShow } = getPaginationPages(totalPages!, pageNumber, 1, 2);

  return (
    <div className='mt-16'>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => {
                setPageNumber(pageNumber - 1);
                router.push(`/series?page=${pageNumber - 1}`);
              }} // Update state and navigate
            />
          </PaginationItem>

          {pagesToShow &&
            pagesToShow.map((page, index) => (
              <PaginationItem
                className={`cursor-pointer ${
                  page === Number(pageNav)
                    ? "bg-foreground/20 text-foreground rounded-lg"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  setPageNumber(page); // Update the Zustand store
                  router.push(`/series?page=${page}`);
                }} // Update state and navigate
              >
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                setPageNumber(pageNumber + 1);
                router.push(`/series?page=${pageNumber + 1}`);
              }} // Update state and navigate
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
