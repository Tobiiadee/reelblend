/** @format */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, use } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useCustomGoogleOneTap from "@/hooks/use-google-one-tap";
import { toast } from "sonner";

const queryClient = new QueryClient();

export default function ClientProvider({ children }: { children: ReactNode }) {
  const { error, isSigingedIn, signInWithGoogle } = useCustomGoogleOneTap();

  const onSuccessHandler = async (credential: string | undefined) => {
    if (credential === undefined) return;
    await signInWithGoogle(credential);
  };

  if (error) {
    console.error("Firebase sign-in error:", error.message);
    toast.error("Sign-in error: " + error.message);
  }

  if (isSigingedIn) {
    toast.success("Signed in successfully");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <div className='hidden'>
          <GoogleLogin
            onSuccess={(res) =>
              onSuccessHandler(res ? res.credential : undefined)
            }
            useOneTap
          />
        </div>
        {children}
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
