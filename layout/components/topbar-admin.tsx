/** @format */
"use client";
import React from "react";
// import AdminProfile from "@/modules/common/components/admin-profile";
import UserAuth from "./user-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import UserDropdown from "@/modules/common/components/user-dropdown";
import AdminProfile from "@/modules/common/components/admin-profile";

export default function TopBarAdmin() {
  const [user] = useAuthState(auth);

  // console.log(user);

  return (
    <div className='w-max flex items-center space-x-3 md:space-x-6 mr-2 md:mr-10'>
      {/* <NotificationBtn /> */}
      {!user && (
        <div className="lg:hidden">
          <AdminProfile />
        </div>
      )}
      {user ? <UserDropdown /> : <UserAuth />}
    </div>
  );
}
