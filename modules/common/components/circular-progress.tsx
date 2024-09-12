/** @format */

import React from "react";

interface CircularProgressProps {
  value: number; // The progress value (0 to 100)
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  if (value < 0 || value > 100) {
    throw new Error("Progress value must be between 0 and 100.");
  }

  return (
    <div className='relative w-12 aspect-square'>
      <div className='absolute inset-0 rounded-full bg-transparent '></div>
      <div
        className='absolute inset-0 rounded-full'
        style={{
          background: `conic-gradient(#d5d8dc ${value}%, transparent 0%)`,
        }}></div>
      <div className='absolute inset-[6px] rounded-full bg-foreground flex items-center justify-center'>
        <span className='text-sm font-semibold text-background'>{value}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
