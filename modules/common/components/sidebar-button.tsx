/** @format */
"use client";

import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { Text } from "./text";
import { usePathname } from "next/navigation";

interface SideBarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  path: string;
  toolTipContent: string;
  target?: boolean;
}

export default function SidebarButton({
  children,
  path,
  toolTipContent,
  target,
  disabled,
  ...props
}: SideBarButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild={!disabled}
            variant={"ghost"}
            className={`rounded-full flex items-center justify-center px-2.5 py-[10px] hover:bg-foreground hover:text-background border border-transparent transition-all duration-300 ${
              isActive ? "border bg-foreground text-background" : ""
            }`}
            disabled={disabled}
            {...props}>
            <Link href={path} target={target ? "blank" : undefined}>
              {children}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={18} className="ml-10">
          <Text variant={"p"} className='text-[10px] font-meduim capitalize'>
            {toolTipContent}
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
