/** @format */

import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import useTypeStateStore from "@/modules/store/set-type-store";
import React from "react";

export default function MobileSelectType() {
  const { setTypeState, typeState } = useTypeStateStore();

  const stateHandler = () => {
    if (typeState === "movies") {
      setTypeState("series");
    } else {
      setTypeState("movies");
    }
  };

  return (
    <Button
      onClick={stateHandler}
      variant={"ghost"}
      className='w-[50vw] h-8 p-0 rounded-2xl flex justify-between border border-foreground/30 overflow-hidden'>
      <div className={`w-full h-full ${typeState === "movies" ? "bg-foreground/30 font-semibold" : ""} flex justify-center items-center `}>
        <Text variant={"p"} className={`text-[11px] ${ typeState === "movies" ? "font-semibold text-background" : ""}`}>
          Movies
        </Text>
      </div>
      <div className={`w-full h-full ${typeState === "series" ? "bg-foreground/30" : ""} flex justify-center items-center `}>
        <Text variant={"p"} className={`text-[11px] ${ typeState === "series" ? "font-semibold text-background" : ""}`}>Series</Text>
      </div>
    </Button>
  );
}
