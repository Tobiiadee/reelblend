/** @format */
"use client";
import NotificationBtn from "@/modules/common/components/notification-btn";
import React from "react";
// import AdminProfile from "@/modules/common/components/admin-profile";
import UserAuth from "./user-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import UserDropdown from "@/modules/common/components/user-dropdown";
import Image from "next/image";

export default function TopBarAdmin() {
  const [user] = useAuthState(auth);

  // console.log(user);

  return (
    <div className='w-max flex items-center space-x-3 md:space-x-6 mr-2 md:mr-10'>
      {/* <NotificationBtn /> */}
      {user ? <UserDropdown /> : <UserAuth />}
    </div>
  );
}
