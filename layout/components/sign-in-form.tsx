"use client";

import { SignInSchema } from "@/lib/schema/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/common/ui/form";
import { Input } from "@/modules/common/ui/input";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/modules/common/ui/button";
import useSignIn from "@/hooks/use-sign-in";
import { useRouter } from "next/navigation";
import { Text } from "@/modules/common/components/text";
import { ShowPassword } from "./sign-up-form";
import useFirebaseErrors from "@/hooks/use-firebase-errors";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isSigningIn, isSignedIn, errorMessage, errorSigningIn } =
    useSignIn();

  const { authError, setFirebaseError } = useFirebaseErrors();

  // Show or hide password state
  const [showPassword, setShowPassword] = useState(false);

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
    setFirebaseError(errorMessage);

    if (errorSigningIn && authError) {
      form.setError("root", {
        type: "manual",
        message: authError,
      });
    }

    if (isSignedIn) {
      router.push("/");
    }
  }, [errorSigningIn, errorMessage, authError, isSignedIn, form, router]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pr-8"
                      placeholder="Enter your password..."
                      {...field}
                    />
                    <ShowPassword
                      showPassword={showPassword}
                      setShowPassword={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <Text variant="p" className="text-red-500">
              {form.formState.errors.root.message}
            </Text>
          )}
        </div>

        <div className="w-full grid place-items-center">
          <Button
            isLoading={isSigningIn}
            disabled={!form.formState.isValid || isSigningIn}
            type="submit"
            className="w-60"
          >
            Sign in
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
