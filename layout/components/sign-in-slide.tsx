/** @format */
"use client";

import { Text } from "@/modules/common/components/text";
import Logo from "@/modules/common/ui/logo";
import React from "react";
import { GoogleSignInButton } from "./sign-in-main";
import { motion } from "framer-motion";
import { Button } from "@/modules/common/ui/button";
import { X } from "lucide-react";

interface SignInSliderProps {
  setSlider: (value: boolean) => void;
}

export default function SignInSlide({ setSlider }: SignInSliderProps) {

  return (
    <motion.div
      initial={{ x: 350 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{ duration: 0.5, delay: 3, type: "spring" }}
      className='absolute right-0 top-16 z-50 w-72 h-max p-6 flex flex-col space-y-4 rounded-xl border border-forground/50 bg-background/90'>
      <div className='w-full flex items-center justify-between'>
        <Logo />
        <Button
          onClick={() => setSlider(false)}
          variant={"ghost"}
          className='hover:bg-transparent'>
          <X size={20} strokeWidth={1.5} />
        </Button>
      </div>

      <Text variant={"h5"} className='font-semibold text-center'>
        Sign in to have better access
      </Text>
      <GoogleSignInButton />
    </motion.div>
  );
}
