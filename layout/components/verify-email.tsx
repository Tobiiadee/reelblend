"use client";

import { Text } from "@/modules/common/components/text";
import React from "react";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{delay: 2}}
      className='w-full h-max py-2 flex justify-center items-center px-2 text-center bg-foreground text-background'>
      <Text variant={"p"}>
        We have sent you an email with a link to verify your email address.
        Please check your inbox.
      </Text>
    </motion.div>
  );
}
