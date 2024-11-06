/** @format */

import VerifyEmail from "@/layout/components/verify-email";
import Footer from "@/layout/footer/footer";
import SideBar from "@/layout/sidebar/sidebar";
import TopBar from "@/layout/topbar/topbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container mx-auto lg:pl-28 lg:pr-16 relative min-w-screen'>
      <TopBar />
      <SideBar />
      <div className='mt-24 md:mt-28'>{children}</div>
      <Footer />
    </div>
  );
}
