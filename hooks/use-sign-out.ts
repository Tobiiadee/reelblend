/** @format */

import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/firebase/config"; // Import your Firebase auth configuration

export default function useSignOutCustom() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [errorSigningOut, setErrorSigningOut] = useState<string | null>(null);

  const logOut = async () => {
    setIsSigningOut(true);
    setIsSignedOut(false);
    setErrorSigningOut(null); // Reset any previous error

    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      setIsSignedOut(true);
      setIsSigningOut(false);
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      setErrorSigningOut(error.message);
      setIsSigningOut(false);
    }
  };

  return { logOut, isSigningOut, errorSigningOut, isSignedOut };
}
