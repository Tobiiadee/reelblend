/** @format */

import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import { Flame } from "lucide-react";
import React from "react";

interface MovieSelectProps {
  type: string;
  icon: React.ReactNode;
}

export default function MovieSelectComp({ type, icon }: MovieSelectProps) {
  return (
    <Button
      variant={"link"}
      className='w-[8rem] md:w-[10rem] h-[2rem] md:h-[3rem] rounded-xl shadow-md flex items-center justify-center space-x-3 hover:bg-foreground hover:text-background focus:scale-105 focus:bg-foreground focus:text-background transition-all duration-300 cursor-pointer'>
      {icon}
      <Text variant={"p"}>{type}</Text>
    </Button>
  );
}
