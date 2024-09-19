/** @format */

import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, set, child, update } from "firebase/database"; // Using Realtime Database
import { auth, db } from "@/firebase/config";
import { useState } from "react";
import { checkAndCreateWatchlist } from "./use-google-sign-in";


export default function useSignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorSigningIn, setErrorSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to sign in a user with email and password
  const signIn = async (email: string, password: string) => {
    setIsSigningIn(true);
    setErrorSigningIn(false);
    setErrorMessage(null);

    try {
      // Sign in the user with email and password using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in successfully!", user);

      // Check if user already exists in the database
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // New user: Initialize profile and create an empty watchlist
        await set(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "", // Firebase may not always return displayName for email sign-in
          watchlist: [], // Initialize empty watchlist for new users
        });
        console.log("New user, profile and watchlist created.");
      } else {
        // Existing user: Update the profile fields without touching the watchlist
        await update(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
        });
        console.log("Existing user, profile updated.");
      }

      // Check and create a watchlist for the user if it doesn't already exist
      await checkAndCreateWatchlist(user.uid);

      setIsSignedIn(true);
      setIsSigningIn(false);
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setErrorSigningIn(true);
      setErrorMessage(error.message);
      setIsSigningIn(false);
      setIsSignedIn(false);
    }
  };

  return {
    signIn,
    isSigningIn,
    isSignedIn,
    errorSigningIn,
    errorMessage,
  };
}

