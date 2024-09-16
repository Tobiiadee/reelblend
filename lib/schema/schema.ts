/** @format */

import z from "zod";

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
