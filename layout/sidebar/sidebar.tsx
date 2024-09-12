/** @format */

import React from "react";
import { Clapperboard, House, Presentation, Star, User } from "lucide-react";
import ToggleTheme from "../components/toggle-theme";
import SidebarButton from "@/modules/common/components/sidebar-button";

export default function SideBar() {
  return (
    <div className='hidden fixed top-0 left-0 z-30 w-20 h-[100dvh] py-6 shadow-lg rounded-r-xl md:flex flex-col items-center justify-between bg-background'>
      <div className='flex flex-col justify-between space-y-6'>
        <Clapperboard strokeWidth={2} />
      </div>
      <div className='flex flex-col space-y-1'>
        <SidebarButton path='/' toolTipContent='Home'>
          <House size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton path='/' toolTipContent='watchlist'>
          <Presentation size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton path='/' toolTipContent='favourite'>
          <Star size={22} strokeWidth={1.5} />
        </SidebarButton>
        <SidebarButton path='/' target={true} toolTipContent='developer'>
          <User size={22} strokeWidth={1.5} />
        </SidebarButton>
      </div>
      <div>
        <ToggleTheme />
      </div>
    </div>
  );
}
