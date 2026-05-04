import productsModel from "../models/products.model";
import {
  AddProductService,
  GetProductsService,
  QueryTypes,
  UpdateProductByIdService,
} from "../types/product.type";
import { AppError } from "../utils/AppError";

export const getProductsService = async ({
  minPrice,
  maxPrice,
  category,
  limit = 20,
  page = 1,
  search,
}: GetProductsService) => {
  const query: QueryTypes = {};

  if (category) query.category = category as string;
  if (minPrice) query.price = { ...query.price, $gte: minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
  if (search) query.title = { $regex: search as string, $options: "i" };

  const skip = (page - 1) * limit;

  const products = await productsModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .select("-__v");

  const totalProducts = await productsModel.countDocuments(query);
  const pages = Math.ceil(totalProducts / Number(limit));
  const hasNextPage = page < pages;
  return { pages, products, totalProducts, hasNextPage };
};

export const addProductService = async ({
  title,
  price,
  seller,
  image,
  stock,
  discount,
}: AddProductService) => {
  return await productsModel.create({
    title,
    price,
    seller,
    image,
    stock,
    discount,
  });
};

export const getProductByIdService = async (productId: string) => {
  const product = await productsModel.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const updateProductByIdService = async ({
  productId,
  ...rest
}: UpdateProductByIdService) => {
  const updateData = Object.fromEntries(
    Object.entries(rest).filter(([key, value]) => value !== undefined),
  );
  const product = await productsModel.findByIdAndUpdate(productId, updateData, {
    new: true,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export const deleteProductByIdService = async (productId: string) => {
  const product = await productsModel.findByIdAndDelete(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
};
