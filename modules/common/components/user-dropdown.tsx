/** @format */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";

import React from "react";
import AdminProfile from "./admin-profile";
import { useRouter } from "next/navigation";
import { Text } from "./text";
import useSignOut from "@/hooks/use-sign-out";
import { toast } from "sonner";

export default function UserDropdown() {
  const router = useRouter();
  const { isSignedOut, logOut, errorSigningOut } = useSignOut();
  if (isSignedOut) toast.success("User is signed out");
  if (!!errorSigningOut) toast.error("An error has occurred");

  const logOutHandler = () => {
    logOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AdminProfile />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className='cursor-pointer'>
          <Text variant={"p"}>Profile</Text>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logOutHandler} className='cursor-pointer'>
          <Text variant={"p"}>Sign Out</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
