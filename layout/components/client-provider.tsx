"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useCustomGoogleOneTap from "@/hooks/use-google-one-tap";
import { toast } from "sonner";
import { auth, db } from "@/firebase/config";
import useEmailVerifyStore from "@/modules/store/email-verify-store";
import Loading from "@/app/loading";
import { ref, set } from "firebase/database";
import useUserStore from "@/modules/store/user-store";

const queryClient = new QueryClient();

export const waitForAuth = () =>
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

export default function ClientProvider({ children }: { children: ReactNode }) {
  const { error, isSigingedIn, signInWithGoogle } = useCustomGoogleOneTap();
  const [userAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const { setEmailVerify } = useEmailVerifyStore();

  const userDetails = useUserStore((state) => state.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await waitForAuth();
        setUserAuth(true);
      } catch {
        setUserAuth(false);
      } finally {
        setLoading(false); // End loading after auth check
      }
    };
    checkAuth();
  }, []);

  // Set state if email is verified
  useEffect(() => {
    const checkEmailVerification = async () => {
      if (!auth.currentUser) return;

      if (!auth.currentUser.emailVerified) {
        await auth.currentUser.reload();
      }

      if (auth.currentUser.emailVerified) {
        setEmailVerify(true);
      }

      // Store additional user data (username) in Realtime Database
      if (auth.currentUser?.emailVerified && userDetails) {
        await set(ref(db, `users/${userDetails?.uid}`), {
          uid: userDetails?.uid, // Store the user's unique ID (uid)
          username: userDetails?.displayName, // Store the username
          email: userDetails?.email, // Store the user's email
          watchlist: [],
        });
      }
    };

    checkEmailVerification();
  }, [auth.currentUser]);

  const onSuccessHandler = async (credential: string | undefined) => {
    if (!credential) return;
    await signInWithGoogle(credential);
  };

  useEffect(() => {
    if (error) {
      console.error("Firebase sign-in error:", error.message);
      toast.error("Sign-in error: " + error.message);
    }
    if (isSigingedIn) {
      toast.success("Signed in successfully");
    }
  }, [error, isSigingedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {!userAuth && (
              <div className='hidden'>
                <GoogleLogin
                  onSuccess={(res) => onSuccessHandler(res?.credential)}
                  useOneTap
                />
              </div>
            )}
            {children}
          </>
        )}
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
