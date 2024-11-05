/** @format */
"use client";

import SignInMain from "@/layout/components/sign-in-main";
import SignUpMain from "@/layout/components/sign-up-main";
import ToggleTheme from "@/layout/components/toggle-theme";
import { cn } from "@/lib/utils";
import { Button } from "@/modules/common/ui/button";
import GridPattern from "@/modules/common/ui/grid-pattern";
import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUp() {
  const router = useRouter();

  return (
    <div className='h-full w-full'>
      <div className='w-full h-max flex items-center justify-between px-4 lg:px-6 py-2 '>
        <Button
          onClick={() => router.back()}
          variant={"ghost"}
          className='px-2'>
          <ArrowLeftFromLine size={20} strokeWidth={1.5} />
        </Button>

        <ToggleTheme className='-right-10' />
      </div>

      <SignUpMain />

      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[100%] skew-y-12"
        )}
      />
    </div>
  );
}
