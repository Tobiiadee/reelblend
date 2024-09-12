/** @format */
"use client";

import { Bell } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import useOpenDrawer from "@/hooks/use-open-drawer";
import Drawer from "@/layout/components/drawer";
import Notifications from "./notifications";

export default function NotificationBtn() {
  const { openDrawer, triggerRef } = useOpenDrawer();

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={openDrawer}
        className='group rounded-full relative border active:border-black/10 hover:bg-transparent hover:text-foreground text-foreground px-2 md:px-2 py-[5px] md:py-4 transition-all duration-300'>
        <Bell
          size={20}
          className='group-active:scale-75 transition-all duration-300'
        />
        <span className='rounded-full absolute -top-1 left-6 px-[7px] py-0 flex items-center justify-center bg-[#f84531]'>
          <p className='text-[12px]'>8</p>
        </span>
      </Button>

      <Drawer side={"right"} triggerRef={triggerRef} title='Notification'>
        <Notifications />
      </Drawer>
    </>
  );
}
