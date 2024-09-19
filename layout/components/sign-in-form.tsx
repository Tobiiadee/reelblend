/** @format */

"use client";

import { SignInSchema } from "@/lib/schema/schema";
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
import z from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { Button } from "@/modules/common/ui/button";
import useSignIn from "@/hooks/use-sign-in";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Text } from "@/modules/common/components/text";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isSigningIn, isSignedIn, errorMessage, errorSigningIn } =
    useSignIn();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    signIn(values.email, values.password);
  }

  useEffect(() => {
    if (errorSigningIn) {
      form.setError("root", {
        type: "manual",
        message: errorMessage ? errorMessage : "An error occurred",
      });
    }
  }, [errorSigningIn, form]);

  //   console.log(errorMessage);

  if (isSignedIn) {
    toast.success("Signed in successfully");
    router.push("/");
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-4'>
        <div className='space-y-4'>
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
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
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

          {form.formState.errors.root && (
            <Text variant={"p"} className='text-red-500'>
              {form.formState.errors.root.message}
            </Text>
          )}
        </div>

        <div className='w-full grid place-items-center'>
          <Button isLoading={isSigningIn} type='submit' className='w-60'>
            Sign in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
