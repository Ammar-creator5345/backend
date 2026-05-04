import { Request, Response } from "express";
import {
  CheckOutRequestBody,
  CreateOrderRequestBody,
} from "../types/order.types";
import { ExtendedRequest } from "../types/global.types";
import {
  cancelOrderService,
  checkOutService,
  createOrderService,
  getOrderHistoryService,
  getOrderService,
  updateOrderService,
} from "../services/order.service";

export const checkOut = async (req: ExtendedRequest, res: Response) => {
  const { items }: CheckOutRequestBody = req.body;
  const total = await checkOutService(items);

  res.status(200).json({
    message: "Checkout calculated successfully",
    total,
  });
};

export const createOrder = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { items, shippingAddress, paymentMethod }: CreateOrderRequestBody =
    req.body;

  const order = await createOrderService(
    userId,
    items,
    shippingAddress,
    paymentMethod,
  );

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: {
      order,
    },
  });
};

export const updateOrder = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await updateOrderService(userId, orderId, status);
  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: {
      order,
    },
  });
};

export const getOrder = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { orderId } = req.params;
  const order = await getOrderService(userId, orderId);

  res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: {
      order,
    },
  });
};

export const getOrderHistory = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const orders = await getOrderHistoryService(userId)
  res.status(200).json({
    success: true,
    message: orders.length
      ? "Order history fetched successfully"
      : "Order history is empty",
    data: {
      orders,
    },
  });
};

export const cancelOrder = async (req: ExtendedRequest, res: Response) => {
  const userId = req.user!.id;
  const { orderId } = req.params;
  const updatedOrder = await cancelOrderService(userId, orderId);
  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: {
      order: updatedOrder,
    },
  });
};
