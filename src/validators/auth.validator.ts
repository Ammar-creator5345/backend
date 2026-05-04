import z from "zod";
import { Roles } from "../constants/global.constant";

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string("name is required"),
    email: z.string("email is required").email("Email is required"),
    password: z
      .string("password is required")
      .min(8, "Password must be of 8 characters"),
    role: z.enum(Roles).optional(),
    age: z.coerce
      .number("Age must be number")
      .int()
      .positive("Age must be positive"),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string("email is required").email("Email is required"),
    password: z.string().min(8, "Password must be of 8 characters"),
  }),
});
