/** @format */

"use client";

import Image from "next/image";
import Reac from "react";
import { Text } from "./text";
import { Button } from "../ui/button";
import useOpenDrawer from "@/hooks/use-open-drawer";
import Link from "next/link";

export default function AdminProfile() {
  return (
    <Button
      asChild
      variant={"ghost"}
      className='w-max flex items-center space-x-4 cursor-pointer group hover:bg-transparent'>
      <Link href={"./profile"}>
        <div className='rounded-full w-8 md:w-10 aspect-square flex justify-center items-center shadow-md relative overflow-hidden'>
          <Image
            src={"/images/profile.jpg"}
            alt=''
            className='object-cover'
            fill
            priority
          />
        </div>

        <div className='hidden md:flex space-x-4 items-center'>
          <Text variant={"p"}>Sarah J</Text>
        </div>
      </Link>
    </Button>
  );
}
