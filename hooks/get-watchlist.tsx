/** @format */

import { ref, get } from "firebase/database";
import { auth, db } from "@/firebase/config";

const getWatchlist = async (): Promise<
  { title: string; id: number; type: "series" | "movie" }[] | undefined
> => {
  try {
    // Wait for Firebase auth to ensure the user is available
    const waitForAuth = () =>
      new Promise<void>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            resolve();
          } else {
            reject(new Error("User not authenticated"));
          }
          unsubscribe(); // Clean up the listener
        });
      });

    await waitForAuth();

    const user = auth.currentUser;

    // Construct the database reference
    const watchlistRef = ref(db, `users/${user?.uid}/watchlist`);
    const snapshot = await get(watchlistRef);

    const watchlist = snapshot.val();
    // console.log("res", watchlist);

    return watchlist;
  } catch (error: any) {
    console.error("Error fetching watchlist:", error.message);
  }
};

export default getWatchlist;
