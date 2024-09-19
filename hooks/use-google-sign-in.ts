/** @format */

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "@/firebase/config"; // Import your Firebase auth configuration
import { ref, get, child, set, update } from "firebase/database";

// Function to check if a watchlist exists for the user and create it if not

export const checkAndCreateWatchlist = async (uid: string) => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users/${uid}/watchlist`));

    // If the snapshot exists and is not null, we do nothing
    if (snapshot.exists() && snapshot.val() !== null) {
      console.log("Watchlist already exists.");
    } else {
      // Watchlist doesn't exist, or is null, create an empty one
      console.log("No watchlist found, creating a new one.");
      await set(ref(db, `users/${uid}/watchlist`), []); // Initialize an empty watchlist array
    }
  } catch (error: any) {
    console.error("Error checking or creating watchlist:", error.message);
  }
};


export default function useGoogleSignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorSigningIn, setErrorSigningIn] = useState<string | null>(null);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsSigningIn(true);
    setIsSignedIn(false);
    setErrorSigningIn(null); // Reset any previous error

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user already exists in the database
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // New user: Initialize profile and create an empty watchlist
        await set(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL, // Save user's profile picture URL
          watchlist: [] // Initialize empty watchlist for new users
        });
        console.log("New user, profile and watchlist created.");
      } else {
        // Existing user: Only update the profile fields without touching the watchlist
        await update(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        console.log("Existing user, profile updated.");
      }

      // Check and create a watchlist for the user if it doesn't already exist
      await checkAndCreateWatchlist(user.uid);

      setIsSignedIn(true);
      setIsSigningIn(false);
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      setErrorSigningIn(error.message);
      setIsSigningIn(false);
    }
  };

  return { signInWithGoogle, isSigningIn, errorSigningIn, isSignedIn };
}

