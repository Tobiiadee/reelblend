import React, { useEffect, useState } from "react";
import useSendData from "@/hooks/use-send-data";
import { useQuery } from "@tanstack/react-query";
import { watchlistIds } from "@/lib/services/tmdb-services";
import useWatchlistState from "@/modules/store/check-watchlist-store";
import { toast } from "sonner";
import { auth } from "@/firebase/config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/ui/tooltip";
import { Bookmark, Heart, Star } from "lucide-react";
import { Button } from "@/modules/common/ui/button";

import { convertDate, modTitle } from "@/lib/helpers/helpers";
import { Text } from "@/modules/common/components/text";

export default function FavButton({
  id,
  type,
  triggerRef,
  title,
  isDetail,
}: {
  type: "series" | "movie";
  triggerRef?: React.RefObject<HTMLButtonElement>;
  title: string;
  id: number;
  isDetail?: boolean;
}) {
  const [fav, setFav] = useState(false);
  const [addWatchlist, setAddWatchlist] = useState(false);

  const { removeDataFromWatchlist, dataSent, sendDataToWatchlist } =
    useSendData();
  const { setInWatchlist, setIsMatchedItem } = useWatchlistState();

  const user = auth.currentUser;

  const { data: listIds } = useQuery({
    queryKey: ["watchlistIds", fav],
    queryFn: () => watchlistIds(),
  });

  const matchedItem = listIds?.find((listId) => listId === id);

  const setWatchlistHandler = () => {
    sendDataToWatchlist({ title, id, type });
    setFav((prev) => !prev);
    if (user) {
      setAddWatchlist((prev) => !prev);
    } else {
      if (triggerRef && triggerRef.current) {
        triggerRef.current.click();
        setFav(false);
      }
      return;
    }
  };

  if (addWatchlist)
    toast.success(
      `${type === "series" ? "Series" : "Movie"} added to your watchlist`
    );

  const removeFromWatchlistHandler = () => {
    removeDataFromWatchlist(id);
    setFav(false);
    setInWatchlist(false);
  };

  useEffect(() => {
    if (dataSent) {
      toast.success(
        `${type === "series" ? "Series" : "Movie"} removed from watchlist`
      );
    }
  }, [dataSent, type]);

  useEffect(() => {
    if (matchedItem) {
      setIsMatchedItem(true);
    }
  }, [matchedItem, setIsMatchedItem]);

  return (
    <>
      {!fav && !matchedItem ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={setWatchlistHandler}
                variant={"ghost"}
                className='bg-none hover:bg-transparent active:scale-75 transition-all duration-300'>
                <Heart
                size={isDetail ? 24 : 20}
                  strokeWidth={1}
                  color='#f84531'
                  fill={"transparent"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text variant={"p"} className='text-[10px]'>
                Add to watchlist
              </Text>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={removeFromWatchlistHandler}
                variant={"ghost"}
                className='bg-none hover:bg-transparent active:scale-75 transition-all duration-300'>
                <Heart
                  size={isDetail ? 24 : 20}
                  strokeWidth={1}
                  color='#f84531'
                  fill={"#f84531"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Text variant={"p"} className='text-[10px]'>
                Remove from watchlist
              </Text>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}
