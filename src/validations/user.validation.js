import { z } from "zod";

export const UserRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["Super Admin", "Admin"]).optional(),
});

export const UserLoginSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});
