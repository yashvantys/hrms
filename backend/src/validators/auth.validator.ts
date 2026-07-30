import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First Name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .trim()
    .min(2, "Last Name must be at least 2 characters")
    .max(30),
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one special character"),

  role: z.enum(["Admin", "HR", "Manager", "Employee"]),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
