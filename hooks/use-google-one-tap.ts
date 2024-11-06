import React from "react";
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export default function useCustomGoogleOneTap() {
  const [isSigingIn, setIsSigingIn] = React.useState(false);
  const [isSigingedIn, setIsSigingedIn] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  async function signInWithGoogle(idToken: string): Promise<void> {
    setIsSigingIn(true);
    setIsSigingedIn(false);
    setError(null);

    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential: UserCredential = await signInWithCredential(
        auth,
        credential
      );
      console.log("User signed in");
      setIsSigingIn(false);
      setIsSigingedIn(true);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setIsSigingIn(false);
        setIsSigingedIn(false);
        setError(error);
        console.error("Firebase sign-in error:", error.message);
      } else {
        console.error("Unknown error occurred during Firebase sign-in.");
      }
    }
  }

  return {
    isSigingIn,
    error,
    isSigingedIn,
    signInWithGoogle,
  };
}
