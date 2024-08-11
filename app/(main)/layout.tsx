/** @format */

import TopBar from "@/layout/topbar/topbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container mx-auto md:px-20 min-w-screen pb-14'>
      <TopBar />
      <div className='mt-12'>{children}</div>
    </div>
  );
}
