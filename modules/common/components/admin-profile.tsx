/** @format */

"use client";

import Image from "next/image";
import React from "react";
import { Text } from "./text";
import { Button } from "../ui/button";
import useOpenDrawer from "@/hooks/use-open-drawer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function AdminProfile() {
  const [user] = useAuthState(auth);

  return (
    <div className='w-max flex items-center space-x-4 cursor-pointer group hover:bg-transparent'>
      <div className='rounded-full w-10 aspect-square flex justify-center items-center shadow-md relative overflow-hidden'>
        <Image
          src={user?.photoURL !== null ? (user?.photoURL as string) : "/images/dummy.png"}
          alt={`${user?.displayName}'s profile picture`}
          className='object-cover'
          fill
          priority
        />
      </div>

      <div className='hidden md:flex space-x-4 items-center'>
        <Text variant={"p"}>{user?.displayName}</Text>
      </div>
    </div>
  );
}
