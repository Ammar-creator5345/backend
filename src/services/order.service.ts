import { orderModel } from "../models/order.model";
import productsModel from "../models/products.model";
import { ExtendedRequest } from "../types/global.types";
import { CheckOutItem, CreateOrderRequestBody } from "../types/order.types";
import { AppError } from "../utils/AppError";
import { calculateTotal } from "../utils/calculateTotal";
import { getProducts } from "../utils/getProducts";

export const checkOutService = async (items: CheckOutItem[]) => {
  if (!items || items.length === 0) {
    throw new AppError("Select the Items for checkout", 400);
  }
  const products = await getProducts(items);
  return calculateTotal(items, products);
};

export const createOrderService = async (
  userId: string,
  items: CheckOutItem[],
  shippingAddress: string,
  paymentMethod: string,
) => {
  if (!items || items.length === 0) {
    throw new AppError("Select the items", 400);
  }

  const products = await getProducts(items);
  const totalPrice = calculateTotal(items, products);
  const order = await orderModel.create({
    userId,
    items,
    totalPrice,
    shippingAddress,
    paymentMethod,
    status: "pending",
  });
  await order.populate("items.product");
  return order;
};

export const updateOrderService = async (
  userId: string,
  orderId: string,
  status: string,
) => {
  const order = await orderModel.findOneAndUpdate(
    { _id: orderId, userId },
    { status },
    { new: true },
  );
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  return order;
};

export const getOrderService = async (userId: string, orderId: string) => {
  const order = await orderModel
    .findOne({ _id: orderId, userId })
    .lean()
    .select("-__v");

  if (!order) {
    throw new AppError("Order not found", 404);
  }
  return order;
};

export const getOrderHistoryService = async (userId: string) => {
  return orderModel.find({ userId }).populate("items.product");
};

export const cancelOrderService = async (userId: string, orderId: string) => {
  const order = await orderModel
    .findOne({ _id: orderId, userId })
    .select("status");

  if (!order) {
    throw new AppError("Order not found", 404);
  }
  if (order?.status !== "pending") {
    throw new AppError("Order cannot be cancelled", 400);
  }
  return await orderModel.findOneAndUpdate(
    { _id: orderId, userId },
    {
      status: "cancelled",
    },
    { new: true },
  );
};
