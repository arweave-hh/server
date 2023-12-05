import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password needs to be longer than 6 characters" }),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "The passwords do not match"
    });
  }
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});
