export interface GetProductsService {
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
}

export interface QueryTypes {
  category?: string;
  price?: { $gte?: number; $lte?: number };
  title?: { $regex: string; $options: string };
}

export interface AddProductService {
  title: string;
  price: number;
  seller: string;
  image: string;
  stock: string;
  discount: string;
}

export interface UpdateProductByIdService {
  productId: string;
  title: string;
  seller: string;
  price: number;
  image: string;
  stock: number;
  discount: number;
}
