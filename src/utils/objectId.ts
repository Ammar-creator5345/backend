import mongoose from "mongoose";
import z from "zod";

export const ObjectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid id");
