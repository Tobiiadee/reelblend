/** @format */

"use client";

import { SignInSchema, SignUpSchema } from "@/lib/schema/schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/ui/form";
import { Input } from "@/modules/common/ui/input";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Button } from "@/modules/common/ui/button";
import useSignUp from "@/hooks/use-sign-up";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/config";

export default function SignUpForm() {
  const router = useRouter();

  const {
    signUp,
    isUserCreated,
    isUsernameExist,
    errorSigningUp,
    isEmailExist,
    isSigningUp,
  } = useSignUp();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    signUp(values.email, values.confirmPassword, values.username);

    // if (!isEmailExist && !isUsernameExist) {
    //   form.reset();
    // }
  }

  useEffect(() => {
    if (isUsernameExist) {
      form.setError("email", {
        type: "manual",
        message: "This email already exists",
      });
    }
    if (isEmailExist) {
      form.setError("username", {
        type: "manual",
        message: "Username not available",
      });
    }
  }, [isEmailExist, isUsernameExist]);

  if (isUserCreated) {
    toast.success("Account created successfully");
    router.push("/");
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='enter your username...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='enter your email...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full flex space-x-4 items-center'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='enter your password...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='confirm your password...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className='w-full grid place-items-center'>
          <Button isLoading={isSigningUp} type='submit' className='w-60'>
            Sign up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
