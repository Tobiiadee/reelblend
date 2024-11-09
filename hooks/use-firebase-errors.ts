"use client";

import { useState } from "react";

export default function useFirebaseErrors() {
  const [authError, setAuthError] = useState<string | null>(null);

  //Firebase: Error (auth/invalid-credential).

  const setFirebaseError = (errorCode: string | null) => {
    let errorMessage = ""; // Initialize message within function scope


    switch (errorCode) {
      // Email/Password Authentication Errors
      case "Firebase: Error (auth/invalid-email).":
        errorMessage = "Invalid email format. Please enter a valid email address.";
        break;
      case "Firebase: Error (auth/user-disabled).":
        errorMessage = "This account has been disabled by an administrator.";
        break;
      case "Firebase: Error (auth/user-not-found).":
        errorMessage = "No account found with this email.";
        break;
      case "Firebase: Error (auth/wrong-password).":
        errorMessage = "Incorrect password. Please try again.";
        break;

      // Account Creation Errors
      case "Firebase: Error (auth/email-already-in-use).":
        errorMessage = "Email is already associated with an account.";
        break;
      case "Firebase: Error (auth/weak-password).":
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;
      case "Firebase: Error (auth/operation-not-allowed).":
        errorMessage = "This sign-in method is not enabled. Contact support.";
        break;

      // OAuth Provider Errors
      case "Firebase: Error (auth/account-exists-with-different-credential).":
        errorMessage = "An account with this email already exists with a different sign-in method.";
        break;
      case "Firebase: Error (auth/popup-closed-by-user).":
        errorMessage = "The sign-in popup was closed before completing sign-in.";
        break;
      case "Firebase: Error (auth/cancelled-popup-request).":
        errorMessage = "Another sign-in attempt is in progress. Please wait.";
        break;

      // Verification & Credential Errors
      case "Firebase: Error (auth/invalid-verification-code).":
        errorMessage = "The verification code is invalid. Please try again.";
        break;
      case "Firebase: Error (auth/invalid-verification-id).":
        errorMessage = "The verification ID is invalid. Please try again.";
        break;
      case "Firebase: Error (auth/invalid-credential).":
        errorMessage = "The credential is invalid or has expired. Please try again.";
        break;

      // Rate Limiting & Security Errors
      case "Firebase: Error (auth/too-many-requests).":
        errorMessage = "Too many attempts. Please wait a moment and try again.";
        break;
      case "Firebase: Error (auth/requires-recent-login).":
        errorMessage = "Please sign in again to perform this sensitive operation.";
        break;

      // Multi-Factor Authentication Errors
      case "Firebase: Error (auth/multi-factor-auth-required).":
        errorMessage = "Additional authentication is required. Please complete the multi-factor authentication step.";
        break;
      case "Firebase: Error (auth/missing-multi-factor-info).":
        errorMessage = "Multi-factor authentication information is missing.";
        break;

      // General Errors
      case "Firebase: (Error auth/invalid-api-key).":
        errorMessage = "Invalid API key. Please contact support.";
        break;
      case "Firebase: (Error auth/network-request-failed).":
        errorMessage = "Network error. Please check your internet connection and try again.";
        break;
      case "Firebase: (Error auth/internal-error).":
        errorMessage = "An internal error occurred. Please try again later.";
        break;

      // Default case for unknown errors
      default:
        errorMessage = "An unknown error occurred. Please try again.";
    }

    // console.log(errorMessage);

    setAuthError(errorMessage); // Update state with the determined message
  };
  
  return { authError, setFirebaseError }; // Return both error message and setter function
}
