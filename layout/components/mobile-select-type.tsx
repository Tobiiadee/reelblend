import { cn } from "@/lib/utils";
import { Text } from "@/modules/common/components/text";
import { Button } from "@/modules/common/ui/button";
import useTypeStateStore from "@/modules/store/set-type-store";
import React from "react";

export default function MobileSelectType() {
  const { setTypeState, typeState } = useTypeStateStore();

  const stateHandler = () => {
    setTypeState(typeState === "movies" ? "series" : "movies");
  };

  return (
    <Button
      onClick={stateHandler}
      variant="ghost"
      className="w-[50vw] h-8 p-0 rounded-2xl space-x-0 flex border border-foreground/30 overflow-hidden "
    >
      <div
        className={cn(
          "w-full h-full flex justify-center items-center",
          typeState === "movies" && "bg-foreground font-semibold"
        )}
      >
        <Text
          variant="p"
          className={cn(
            "text-[11px]",
            typeState === "movies" && "font-semibold text-background"
          )}
        >
          Movies
        </Text>
      </div>

      <div
        className={cn(
          "w-full h-full flex justify-center items-center",
          typeState === "series" && "bg-foreground"
        )}
      >
        <Text
          variant="p"
          className={cn(
            "text-[11px]",
            typeState === "series" && "font-semibold text-background"
          )}
        >
          Series
        </Text>
      </div>
    </Button>
  );
}
