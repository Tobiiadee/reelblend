/** @format */

import React from "react";
import { Text } from "./text";
import { Button } from "../ui/button";
import { Trash, Trash2 } from "lucide-react";

export default function Notification() {
  return (
    <div className='flex w-full min-h-16 bg-background shadow-md transition-all duration-300'>
      <div className=' w-1 bg-foreground' />
      <div className='flex w-full pl-6 items-center justify-between'>
        <Text variant={"p"} className="w-full">This is a test notification</Text>
        <Button variant={"ghost"} className='hover:bg-transparent group'>
          <Trash2 size={16} strokeWidth={1.5} className="group-active:scale-90 transition-all duration-200"/>
        </Button>
      </div>
    </div>
  );
}
