/** @format */

import DashboardVideo from "@/modules/common/components/dashboard-video";
import DashboardVideoDetails from "@/modules/common/components/dashboard-video-details";
import React from "react";

export default function MovieDashboard() {
  return (
    <div className='w-full relative flex flex-col space-y-24 mb-10'>
      <DashboardVideo />
      <DashboardVideoDetails/>
    </div>
  );
}
