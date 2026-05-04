import productsModel from "../models/products.model";
import { CheckOutItem } from "../types/order.types";

export const getProducts = async (items: CheckOutItem[]) => {
  const productIds = items.map((item) => item.product);
  const products = await productsModel
    .find({ _id: { $in: productIds } })
    .lean();
  return products;
};
