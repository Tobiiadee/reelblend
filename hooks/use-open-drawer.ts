/** @format */

import React, { useRef } from "react";

export default function useOpenDrawer() {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDrawer = () => {
    if (triggerRef.current) {
      triggerRef.current.click();
    }
  };

  return { triggerRef, openDrawer };
}
