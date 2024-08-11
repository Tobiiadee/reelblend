/** @format */

import Notification from "@/modules/common/components/notification";
import React from "react";
import AdminComp from "./admin-comp";
import ToggleTheme from "./toggle-theme";

export default function TopBarAdmin() {
  return (
    <div className='flex items-center gap-8 mr-10'>
      <Notification />
      <AdminComp />
      {/* <ToggleTheme /> */}
    </div>
  );
}
