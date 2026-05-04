import { Request, Response } from "express";
import { cartModel } from "../models/cart.model";
import productsModel from "../models/products.model";
import {
  addToCartService,
  getCartService,
  updateCartService,
} from "../services/cart.service";
import { ExtendedRequest } from "../types/global.types";

export const getCart = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { cart, totalPrice, totalItems } = await getCartService(userId);
  res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: {
      cart: {
        items: cart?.items,
        totalPrice,
        totalItems,
      },
    },
  });
};

export const addToCart = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity = 1 } = req.body;

  const { cart, totalPrice, totalItems } = await addToCartService(
    userId,
    productId,
    quantity,
  );

  return res.status(201).json({
    success: true,
    message: "Item added to cart",
    data: {
      cart: {
        items: cart.items,
        totalPrice,
        totalItems,
      },
    },
  });
};

export const updateCart = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;

  const { cart, totalPrice, totalItems } = await updateCartService(
    userId,
    productId,
    quantity,
  );
  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    data: {
      cart: {
        items: cart.items,
        totalPrice,
        totalItems,
      },
    },
  });
};
