import mongoose from "mongoose";
import z from "zod";
import { ObjectId } from "../utils/objectId";

export const getAllProductsSchema = z.object({
  query: z.object({
    maxPrice: z.coerce.number("must be number").optional(),
    minPrice: z.coerce.number("must be number").optional(),
    page: z.coerce.number("must be number").optional(),
    limit: z.coerce.number("must be number").optional(),
    category: z.string().optional(),
    search: z.string().optional(),
  }),
});

export const addProductSchema = z.object({
  body: z.object({
    title: z.string("title is required"),
    price: z
      .number("price is required and must be number")
      .int()
      .positive("price must be positive"),
    seller: z.string("Seller name is required"),
    image: z.string("image is required"),
    stock: z.coerce
      .number("quantity must be number")
      .int()
      .positive("quantity must be positive")
      .optional(),
    discount: z.coerce.number("must be number").optional(),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: ObjectId,
  }),
});

export const UpdateProductByIdSchema = z.object({
  body: z.object({
    title: z.string("title is required").optional(),
    price: z
      .number("price is required and must be number")
      .int()
      .positive("price must be positive")
      .optional(),
    seller: z.string("Seller name is required").optional(),
    image: z.string("image is required").optional(),
    stock: z.coerce
      .number("quantity must be number")
      .int()
      .positive("quantity must be positive")
      .optional(),
    discount: z.coerce.number("must be number").optional(),
  }),
  params: z.object({
    id: ObjectId,
  }),
});

export const deleteProductByIdSchema = z.object({
  params: z.object({
    id: ObjectId,
  }),
});
