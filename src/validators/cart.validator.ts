import z from "zod";
import { ObjectId } from "../utils/objectId";

export const addToCartSchema = z.object({
  body: z.object({
    productId: ObjectId,
    quantity: z
      .number("quantity is required and must be number")
      .int("quantity must be integer")
      .positive("quantity must be positive number"),
  }),
});

export const updateCartSchema = z.object({
  body: z.object({
    productId: ObjectId,
    quantity: z
      .number("quantity is required")
      .int("must be integer")
      .positive("quantity must be number"),
  }),
});
