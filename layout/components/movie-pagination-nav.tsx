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
import usePaginationStoreMovies from "@/modules/store/pagination-store-movies";
import { getPaginationPages } from "@/lib/helpers/helpers";
import { useRouter, useSearchParams } from "next/navigation"; // Import router for programmatic navigation
import { useQuery } from "@tanstack/react-query";
import { getAllMovies } from "@/lib/services/tmdb-services";

interface PaginationProps {
  totalPages?: number;
}

export default function MoviePaginationNav() {
  const { data: allMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getAllMovies(),
  });

  const totalPages = allMovies?.total_pages;
  const { setMoviesPageNumber: setPageNumber, pageNumber } = usePaginationStoreMovies();

  const router = useRouter();
  
  const searchParams = useSearchParams();
  const pageNav = searchParams ? searchParams.get("page") : undefined;

  const { pagesToShow } = getPaginationPages(totalPages!, pageNumber, 1, 2);

  return (
    <div className='mt-16'>
      <Pagination>
        <PaginationContent>
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious
              onClick={() => {
                setPageNumber(pageNumber - 1);
                router.push(`/all_movies?page=${pageNumber - 1}`);
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
                  router.push(`/all_movies?page=${page}`);
                }} // Update state and navigate
              >
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
            ))}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          <PaginationItem className='cursor-pointer'>
            <PaginationNext
              onClick={() => {
                setPageNumber(pageNumber + 1);
                router.push(`/all_movies?page=${pageNumber + 1}`);
              }} // Update state and navigate
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
