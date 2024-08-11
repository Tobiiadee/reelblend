/** @format */

import { Bell } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Text } from "./text";

export default function Notification() {
  return (
    <Button
      variant={"ghost"}
      className='group rounded-full relative bg-foreground/40 active:bg-foreground/50 hover:bg-foreground/55 px-2 py-4'>
      <Bell size={20} className="group-active:scale-95 transition-all duration-300"/>
      <span className='rounded-full absolute -top-1 left-6 px-[7px] py-0 flex items-center justify-center bg-[#f84531]'>
        <p className="text-[12px]">8</p>
      </span>
    </Button>
  );
}
