import { object, string } from "zod";

export const registerSchema = object({
  userName: string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(32, "Username must be less than 32 characters"),
  fullName: string({ required_error: "Full name is required" })
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const loginSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
