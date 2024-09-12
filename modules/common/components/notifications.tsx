/** @format */

import React from "react";
import Notification from "./notification";

export default function Notifications() {
  return (
    <div className="flex flex-col space-y-2">
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
}
