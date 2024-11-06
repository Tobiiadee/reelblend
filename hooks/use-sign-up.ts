/** @format */

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ref, set, get, child } from "firebase/database";
import { auth, db } from "@/firebase/config"; // import auth and database from your firebaseConfig.js
import { useState } from "react";
import useUserStore from "@/modules/store/user-store";

// Function to check if the username already exists in Realtime Database
const checkUsernameExists = async (username: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `users`));

  if (snapshot.exists()) {
    const users = snapshot.val();
    return Object.values(users).some((user: any) => user.username === username);
  } else {
    return false; // No users exist yet
  }
};

export default function useSignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [isUsernameExist, setIsUsernameExist] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [errorSigningUp, setErrorSigningUp] = useState(false);

  //Store user data
  const setUserCredential = useUserStore((state) => state.setUser);

  // Function to sign up a user with email, password, and username
  const signUp = async (email: string, password: string, username: string) => {
    setIsSigningUp(true);
    setErrorSigningUp(false);
    try {
      // Check if username is unique
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        console.log("Username already exists!");
        setIsUsernameExist(true);
        return;
      } else {
        setIsUsernameExist(false);
      }

      // Create a new user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.email === null) return;
      setUserCredential({
        uid: user.uid,
        email: user.email,
        displayName: username,
      });

      // Set the display name for the user
      await updateProfile(user, {
        displayName: username, // This sets the display name
      });

      //Send email verification
      await sendEmailVerification(user);

      // // Store additional user data (username) in Realtime Database
      // if (auth.currentUser?.emailVerified) {
      //   await set(ref(db, `users/${user.uid}`), {
      //     uid: user.uid, // Store the user's unique ID (uid)
      //     username: username, // Store the username
      //     email: email, // Store the user's email
      //     watchlist: [],
      //   });
      // }

      setIsSigningUp(false);
      console.log(
        "User signed up successfully with username, email, and password!"
      );
      //   const uid = userCredential.user.uid;
      setIsUsernameExist(false);
      setIsUserCreated(true);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setIsEmailExist(true);
      }
      console.error("Error signing up:", error.message);
      setErrorSigningUp(true);
      setIsUserCreated(false);
    }
  };

  return {
    signUp,
    isSigningUp,
    isUsernameExist,
    isUserCreated,
    errorSigningUp,
    isEmailExist,
  };
}

// Example usage:
// signUp("test@example.com", "password123", "myUsername123");
