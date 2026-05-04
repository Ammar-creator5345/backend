import { CustomError } from "../types/global.types";
import { CheckOutItem } from "../types/order.types";

interface product {
  _id: string;
  price: number;
}

export const calculateTotal = (items: CheckOutItem[], products: any) => {
  return items.reduce((acc, item) => {
    const product = products.find(
      (p: product) => p._id.toString() === item.product.toString(),
    );
    if (!product) {
      const error = new Error("Product not found") as CustomError;
      error.statusCode = 400;
      throw error;
    }

    return acc + product.price * item.quantity;
  }, 0);
};
