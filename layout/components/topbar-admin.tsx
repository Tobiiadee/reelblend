/** @format */

import NotificationBtn from "@/modules/common/components/notification-btn";
import React from "react";
import AdminProfile from "@/modules/common/components/admin-profile";
import User from "./user";

export default function TopBarAdmin() {
  return (
    <div className='w-max flex items-center space-x-3 md:space-x-6 mr-2 md:mr-10'>
      <NotificationBtn />
      <User />
      {/* <AdminProfile /> */}
    </div>
  );
}
