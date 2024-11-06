/** @format */

import { ref, get } from "firebase/database";
import { auth, db } from "@/firebase/config";
import { waitForAuth } from "@/layout/components/client-provider";

const getWatchlist = async (): Promise<
  { title: string; id: number; type: "series" | "movie" }[] | undefined
> => {
  try {
    // Ensure the user is authenticated
    await waitForAuth();

    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Construct the database reference
    const watchlistRef = ref(db, `users/${user.uid}/watchlist`);
    const snapshot = await get(watchlistRef);

    if (!snapshot.exists()) {
      console.warn("No watchlist data found.");
      return [];
    }

    // Return the watchlist data if it exists
    const watchlist = snapshot.val();
    return watchlist;
  } catch (error: any) {
    console.error("Error fetching watchlist:", error.message);
  }
};

export default getWatchlist;
