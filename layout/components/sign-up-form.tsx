"use client";

import { SignInSchema, SignUpSchema } from "@/lib/schema/schema";
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
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/modules/common/ui/button";
import useSignUp from "@/hooks/use-sign-up";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import useFirebaseErrors from "@/hooks/use-firebase-errors";
import { Text } from "@/modules/common/components/text";

export default function SignUpForm() {
  const router = useRouter();

  // Show or hide password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { signUp, isUserCreated, errorSigningUp, isSigningUp, errorMessage } =
    useSignUp();

  const { authError, setFirebaseError } = useFirebaseErrors();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignUpSchema>) {
    signUp(values.email, values.confirmPassword, values.username);
  }

  useEffect(() => {
    setFirebaseError(errorMessage);

    if (errorSigningUp && authError) {
      form.setError("root", {
        type: "manual",
        message: authError,
      });
    }
  }, [errorSigningUp, errorMessage, authError, form]);

  if (isUserCreated) {
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
                  <Input placeholder='Enter your username...' {...field} />
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
                  <Input placeholder='Enter your email...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col space-y-4'>
            <div className='w-full flex space-x-4 items-center'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? "text" : "password"}
                          className='pr-8'
                          placeholder='Enter your password...'
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

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPasswordConfirm ? "text" : "password"}
                          className='pr-8'
                          placeholder='Confirm your password...'
                          {...field}
                        />
                        <ShowPassword
                          showPassword={showPasswordConfirm}
                          setShowPassword={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.formState.errors.root && (
            <Text variant='p' className='text-red-500'>
              {form.formState.errors.root.message}
            </Text>
          )}
        </div>

        <div className='w-full grid place-items-center'>
          <Button
            isLoading={isSigningUp}
            disabled={!form.formState.isValid || isSigningUp}
            type='submit'
            className='w-60'>
            Sign up
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export function ShowPassword({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: () => void;
}) {
  return (
    <div
      onClick={setShowPassword}
      className='flex items-center space-x-2 absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'>
      {!showPassword ? (
        <EyeOffIcon strokeWidth={1.5} size={20} className='text-foreground' />
      ) : (
        <EyeIcon strokeWidth={1.5} size={20} className='text-foreground' />
      )}
    </div>
  );
}
