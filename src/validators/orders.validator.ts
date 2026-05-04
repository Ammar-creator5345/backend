import z from "zod";
import { ObjectId } from "../utils/objectId";
import { OrderStatus } from "../constants/order.constants";

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        product: z.string("product id is required"),
        quantity: z
          .number("quantity must be number")
          .int()
          .positive("quantity must be positive"),
      }),
    ),
    shippingAddress: z.string("shipping address is required"),
    paymentMethod: z.string("payment method is required"),
  }),
});

export const updateOrderSchema = z.object({
  params: z.object({
    orderId: ObjectId,
  }),
  body: z.object({
    status: z.enum(OrderStatus),
  }),
});

export const getOrderSchema = z.object({
  params: z.object({
    orderId: ObjectId,
  }),
});

export const cancelOrderSchema = z.object({
  params: z.object({
    orderId: ObjectId,
  }),
});
