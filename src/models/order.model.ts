import mongoose from "mongoose";
import { OrderStatus } from "../constants/order.constants";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: "pending",
    },
  },

  { timestamps: true },
);

orderSchema.set("toJSON", {
  transform(doc, ret, options) {
    delete ret.userId;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
    ret.items.forEach((item: any) => delete item._id);
    return ret;
  },
});

export const orderModel = mongoose.model("Order", orderSchema);
