import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false },
);
productSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
    delete ret.updatedAt;
    delete ret.createdAt;
    return ret;
  },
});

const productsModel = mongoose.model("Product", productSchema);
export default productsModel;
