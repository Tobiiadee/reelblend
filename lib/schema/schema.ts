/** @format */

import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long." }),
});

// Define the SignUp schema
export const SignUpSchema = z
  .object({
    username: z.string().min(4, {
      message:
        "Please enter a valid username. It should be at least 4 characters long.",
    }),
    email: z.string().email({ message: "Please enter a valid email address." }), // Email validation
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long." }), // Optional password length validation
    confirmPassword: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long." }), // Ensure confirm password has the same constraints
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match. Please confirm your password correctly.",
  });
