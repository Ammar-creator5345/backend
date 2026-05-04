import { Response, Request } from "express";
import {
  addProductService,
  deleteProductByIdService,
  getProductByIdService,
  getProductsService,
  updateProductByIdService,
} from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const { pages, products, totalProducts, hasNextPage } =
    await getProductsService(req.query);
  res.status(200).json({
    success: true,
    message: "All products fetched successfully",
    pagination: {
      page: req.query.page,
      totalPages: pages,
      totalProducts,
      hasNextPage,
    },
    data: {
      products,
    },
  });
};

export const addProduct = async (req: Request, res: Response) => {
  console.log(req.body)
  const product = await addProductService(req.body);
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: {
      product,
    },
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await getProductByIdService(id);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      product,
    },
  });
};

export const updateProductById = async (req: Request, res: Response) => {
  const product = await updateProductByIdService({
    productId: req.params.id,
    ...req.body,
  });
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: {
      product,
    },
  });
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteProductByIdService(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};
