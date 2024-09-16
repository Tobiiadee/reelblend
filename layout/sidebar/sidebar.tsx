/** @format */

import React, { useEffect, useState } from "react";
import { House, Presentation, Star, User } from "lucide-react";
import ToggleTheme from "../components/toggle-theme";
import SidebarButton from "@/modules/common/components/sidebar-button";
import LogoSvg from "@/modules/common/ui/logo-svg";
import { MixIcon } from "@radix-ui/react-icons";
import { Button } from "@/modules/common/ui/button";

export default function SideBar() {
 

  return (
    <div className='hidden fixed top-0 left-0 z-30 w-20 h-[100dvh] py-6 shadow-lg rounded-r-xl md:flex flex-col items-center justify-between bg-background'>
      <div className='flex flex-col justify-between space-y-6'>
        <Button variant={"ghost"} className="px-1">
          <MixIcon width={27} height={27}/>
        </Button>
      </div>
      <div className='flex flex-col space-y-1'>
        <SidebarButton path='/' toolTipContent='Home'>
          <House size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton path='/watchlist' toolTipContent='watchlist'>
          <Presentation size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton path='' toolTipContent='favourite'>
          <Star size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton
          path='https://portfolio10-git-main-tobi-ades-projects.vercel.app/contact'
          target={true}
          toolTipContent='developer'>
          <User size={22} strokeWidth={1.5} />
        </SidebarButton>
      </div>
      <div>
        <ToggleTheme className="left-6 bottom-6" />
      </div>
    </div>
  );
}
