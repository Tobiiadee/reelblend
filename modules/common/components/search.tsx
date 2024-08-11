/** @format */

import React from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";

export default function TopBarSearch({
  onClick,
  search,
}: {
  onClick: () => void;
  search: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      variant={"ghost"}
      className='rounded-full bg-background active:scale-95 transition-all border border-foreground duration-300 hover:bg-background px-2.5'>
      {search ? (
        <X size={15} strokeWidth={3} />
      ) : (
        <Search size={15} strokeWidth={3} />
      )}
    </Button>
  );
}
