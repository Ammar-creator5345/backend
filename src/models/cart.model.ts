import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        _id: false,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

cartSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.userId;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.__v;
    delete ret._id;
    ret.items.forEach((item: any) => delete item._id);
    return ret;
  },
});

export const cartModel = mongoose.model("Cart", cartSchema);
