/** @format */

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/modules/common/ui/dropdown-menu";
import AdminProfile from "@/modules/common/components/admin-profile";
import { ListVideo } from "lucide-react";

export default function AdminComp() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:border-none focus:outline-none'>
        <AdminProfile />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Watchlist
          <DropdownMenuShortcut>
            <ListVideo strokeWidth={1}/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
