/** @format */

import { ref, get, update } from "firebase/database";
import { auth, db } from "@/firebase/config"; // Firebase auth and database config
import { useState } from "react";

// Hook to manage watchlist operations in Firebase (add and remove items)
export default function useSendData() {
  const [isSending, setIsSending] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [errorSending, setErrorSending] = useState<string | null>(null);

  // Function to add a new item to the watchlist
  const sendDataToWatchlist = async (newItem: {
    title: string;
    id: number;
    type: "movie" | "series";
  }) => {
    setIsSending(true);
    setDataSent(false);
    setErrorSending(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const watchlistRef = ref(db, `users/${user.uid}/watchlist`);

      // Get the current watchlist data
      const snapshot = await get(watchlistRef);

      let currentWatchlist = [];

      if (snapshot.exists()) {
        currentWatchlist = snapshot.val(); // Get the existing watchlist array
      }

      // Add the new item to the watchlist array
      const updatedWatchlist = [...currentWatchlist, newItem];

      // Update the watchlist in Firebase
      await update(ref(db, `users/${user.uid}`), {
        watchlist: updatedWatchlist,
      });

      console.log("Data added to watchlist successfully!");
      setDataSent(true);
      setIsSending(false);
    } catch (error: any) {
      console.error("Error sending data to watchlist:", error.message);
      setErrorSending(error.message);
      setIsSending(false);
      setDataSent(false);
    }
  };

  // Function to remove an item from the watchlist
  const removeDataFromWatchlist = async (itemId: number) => {
    setIsSending(true);
    setDataSent(false);
    setErrorSending(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const watchlistRef = ref(db, `users/${user.uid}/watchlist`);

      // Get the current watchlist data
      const snapshot = await get(watchlistRef);

      let currentWatchlist = [];

      if (snapshot.exists()) {
        currentWatchlist = snapshot.val(); // Get the existing watchlist array
      }

      // Filter out the item with the matching ID
      const updatedWatchlist = currentWatchlist.filter(
        (item: { id: number }) => item.id !== itemId
      );

      // Update the watchlist in Firebase
      await update(ref(db, `users/${user.uid}`), {
        watchlist: updatedWatchlist,
      });

      console.log("Item removed from watchlist successfully!");
      setDataSent(true);
      setIsSending(false);
    } catch (error: any) {
      console.error("Error removing item from watchlist:", error.message);
      setErrorSending(error.message);
      setIsSending(false);
      setDataSent(false);
    }
  };

  return {
    sendDataToWatchlist,
    removeDataFromWatchlist, // New function to remove items from the watchlist
    isSending,
    errorSending,
    dataSent,
  };
}
