/** @format */

import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { ref, set, get, child } from "firebase/database";
import { auth, db } from "@/firebase/config"; // Import your Firebase auth configuration
import { useState } from "react";

// Function to check if the email already exists in Realtime Database
const checkEmailExists = async (email: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users`));

  if (snapshot.exists()) {
    const users = snapshot.val();
    return Object.values(users).some((user: any) => user.email === email);
  } else {
    return false; // No users exist yet
  }
};

// Function to initialize an empty watchlist for a new user
const initializeWatchlist = async (uid: string) => {
  await set(ref(db, `users/${uid}/watchlist`), []); // Initialize an empty array for watchlist
};

export default function useGoogleSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [errorSigningUp, setErrorSigningUp] = useState<string | null>(null);

  const googleProvider = new GoogleAuthProvider();

  const signUpWithGoogle = async () => {
    setIsSigningUp(true);
    setIsSignedUp(false);
    setErrorSigningUp(null); // Reset any previous error

    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the email already exists in the database
      const emailExists = await checkEmailExists(user.email || "");
      if (emailExists) {
        console.log("Email already exists!");
        setErrorSigningUp("Email already exists.");
        setIsSigningUp(false);
        return;
      }

      // Store additional user data in Realtime Database
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL, // Save user's profile picture URL
      });

      // Initialize an empty watchlist for the user
      await initializeWatchlist(user.uid);

      console.log("User signed up successfully with Google!");
      setIsSignedUp(true);
      setIsSigningUp(false);
    } catch (error: any) {
      console.error("Error signing up with Google:", error.message);
      setErrorSigningUp(error.message);
      setIsSigningUp(false);
    }
  };

  return {
    signUpWithGoogle,
    isSigningUp,
    errorSigningUp,
    isSignedUp,
  };
}
