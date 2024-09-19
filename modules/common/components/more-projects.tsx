/** @format */
"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import { MixIcon } from "@radix-ui/react-icons";
import MoreProjectItem from "./more-project-item";
import { useQuery } from "@tanstack/react-query";
import fetchMorePorjects from "@/lib/services/more-project";
import { Skeleton } from "../ui/skeleton";
import { Text } from "./text";

export default function MoreProjects<FirebaseResponse, Error>() {
  const { data: moreProjects, isLoading } = useQuery({
    queryKey: ["more-projects"],
    queryFn: () => fetchMorePorjects(),
  });

  const projects = Object.entries(moreProjects ?? {}).map(([key, project]) => ({
    ...project,
    id: project.id ?? key, // Only add 'id' if it's not already present
  }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='p-2 hover:bg-accent rounded-md'>
          <MixIcon width={27} height={27} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='absolute w-[15rem] left-[2rem] -top-[0.5rem] p-4'>
        <div className='w-full grid place-items-center mb-2'>
          <Text variant={"h5"} className='font-semibold'>
            More Projects
          </Text>
        </div>
        <div className='grid grid-cols-2 gap-2 w-full h-full'>
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <MoreProjectItemSkeleton key={i} />
            ))}

          {projects.map((project) => (
            <DropdownMenuItem key={project.id} className='w-max'>
              <MoreProjectItem
                title={project.title}
                id={project.id}
                url={project.url}
                thumbnailUrl={project.thumbnailUrl}
              />
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const MoreProjectItemSkeleton = () => {
  return (
    <div className='flex flex-col space-y-2 items-center'>
      <Skeleton className=' w-10 aspect-square rounded-full ' />
      <Skeleton className='w-8 h-2 rounded' />
    </div>
  );
};
