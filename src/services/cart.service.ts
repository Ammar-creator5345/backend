import mongoose from "mongoose";
import { cartModel } from "../models/cart.model";
import productsModel from "../models/products.model";
import { AppError } from "../utils/AppError";
import { getProductByIdSchema } from "../validators/products.validator";
import { INSPECT_MAX_BYTES } from "buffer";

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  let totalPrice = 0;
  let totalItems = 0;
  const product = await productsModel.findById(productId).lean();
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  let cart = await cartModel.findOne({ userId });
  if (!cart) {
    cart = await cartModel.create({
      userId,
      items: [
        {
          product: productId,
          quantity,
        },
      ],
    });
    totalPrice = product.price * quantity;
    totalItems = quantity;
    return { cart, totalPrice, totalItems };
  }
  const index = cart.items.findIndex((item) => {
    return item.product.toString() === productId.toString();
  });

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    const productObjectId = new mongoose.Types.ObjectId(productId);
    cart.items.push({
      product: productObjectId,
      quantity,
    });
  }
  cart = await cart.save();
  await cart.populate("items.product");
  cart?.items.forEach((item: any) => {
    totalPrice += item.quantity * item.product.price;
    totalItems += item.quantity;
  });
  return { cart, totalPrice, totalItems };
};

export const updateCartService = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  let totalPrice = 0;
  let totalItems = 0;
  const product = await productsModel.findById(productId).lean();

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  let cart = await cartModel.findOne({ userId });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  const index = cart?.items.findIndex((item) => {
    return item.product.toString() === productId.toString();
  });
  if (index === -1) {
    throw new AppError("Item not in cart", 404);
  }
  if (quantity <= 0) {
    cart.items.splice(index, 1);
  } else {
    cart.items[index].quantity += quantity;
  }
  cart = await cart.save();
  await cart.populate("items.product");

  cart?.items.forEach((item: any) => {
    totalPrice += item.quantity * item.product.price;
    totalItems += item.quantity;
  });
  return { cart, totalPrice, totalItems };
};

export const getCartService = async (userId: string) => {
  let totalPrice = 0;
  let totalItems = 0;
  const cart = await cartModel.findOne({ userId }).populate("items.product");
  cart?.items.forEach((item: any) => {
    totalPrice += item.quantity * item.product.price;
    totalItems += item.quantity;
  });
  return { cart, totalPrice, totalItems };
};
