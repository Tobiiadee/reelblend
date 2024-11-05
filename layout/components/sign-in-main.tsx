/** @format */

import { Text } from "@/modules/common/components/text";
import LogoSvg from "@/modules/common/ui/logo-svg";
import React from "react";
import SignInForm from "./sign-in-form";
import { Button } from "@/modules/common/ui/button";
import { Separator } from "@/modules/common/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useGoogleSignIn from "@/hooks/use-google-sign-in";
import { toast } from "sonner";
import { auth } from "@/firebase/config";

export default function SignInMain() {
  return (
    <div className='w-full min-h-full grid place-items-center lg:-mt-10'>
      <div className='lg:shadow-md h-full rounded-xl lg:bg-foreground/10 backdrop-blur-md w-full sm:w-[90vw] lg:w-2/5 px-6 py-6'>
        <div className='flex flex-col justify-center'>
          <div className='flex space-x-4 justify-center'>
            <LogoSvg />
            <Text variant={"h4"} className='text-foreground font-serif'>
              ReelBlend
            </Text>
          </div>

          <Text variant={"p"} className='text-center'>
            Sign in to your account
          </Text>
        </div>
        <div className='w-full flex justify-center mt-4'>
          <GoogleSignInButton />
        </div>

        <div className='w-full flex space-x-4 items-center justify-center mt-4 overflow-hidden'>
          <Separator orientation='horizontal' className='bg-foreground/50' />
          <Text variant={"p"}>or</Text>
          <Separator orientation='horizontal' className='bg-foreground/50' />
        </div>

        <SignInForm />

        <div className='mt-4'>
          <Text variant={"p"} className='text-[14px]'>
            Don&rsquo;t have an account? {""}
            <Link href={"/sign-up"} className='font-medium'>
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

export function GoogleSignInButton() {
  const router = useRouter();
  const { signInWithGoogle, isSigningIn, isSignedIn } = useGoogleSignIn();
  
  

  if (!!auth.currentUser) {
    toast.success("You signed in successfully");
    router.push("/");
  }

  return (
    <Button
      onClick={() => {
        signInWithGoogle();
      }}
      variant={"default"}
      isLoading={isSigningIn}
      className='w-60 flex space-x-4 items-center justify-center'>
      <GoogleIcon />
      <Text variant={"p"} className='font-medium'>
        Google
      </Text>
    </Button>
  );
}

function GoogleIcon() {
  return (
    <svg
      width='20px'
      height='20px'
      viewBox='-3 0 262 262'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid'>
      <path
        d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
        fill='#4285F4'
      />
      <path
        d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
        fill='#34A853'
      />
      <path
        d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'
        fill='#FBBC05'
      />
      <path
        d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
        fill='#EB4335'
      />
    </svg>
  );
}
