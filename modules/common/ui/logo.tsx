/** @format */

import Link from "next/link";
import React from "react";
import { Text } from "../components/text";
import LogoSvg from "./logo-svg";

export default function Logo() {
  return (
    <Link href={"/"} className='flex items-center space-x-2'>
      <Text variant={"h4"} className='text-foreground font-serif'>
        ReelBlend
      </Text>
    </Link>
  );
}
