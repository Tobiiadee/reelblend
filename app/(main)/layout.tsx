/** @format */

import Footer from "@/layout/footer/footer";
import SideBar from "@/layout/sidebar/sidebar";
import TopBar from "@/layout/topbar/topbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container mx-auto md:pl-28 md:pr-16 relative min-w-screen'>
      <TopBar />
      <SideBar />
      <div className='mt-24 md:mt-28'>{children}</div>
      <Footer />
    </div>
  );
}
