/** @format */

import { LoaderCircle } from "lucide-react";
import React from "react";

export default function VideoLoading() {
  return (
    <div className='absolute text-lg top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center'>
      <LoaderCircle size={40} className='animate-spin mr-2'/>
    </div>
  );
}
