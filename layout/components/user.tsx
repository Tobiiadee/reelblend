/** @format */

import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import Link from "next/link";
import React from "react";

export default function User() {
  return (
    <div className='hidden md:flex space-x-4 items-center'>
      <Button asChild variant={"ghost"} className='rounded-3xl'>
        <Link href={"/sign-in"}>
          <Text variant={"p"}>Sign in</Text>
        </Link>
      </Button>
      <Button asChild variant={"default"} className='rounded-3xl'>
        <Link href={"/sign-up"}>
          <Text variant={"p"}>Sign up</Text>
        </Link>
      </Button>
    </div>
  );
}
