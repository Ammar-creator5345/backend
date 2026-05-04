import express from "express";
import {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller";
import { validateProductId } from "../middlewares/validateProductId.middleware";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  addProductSchema,
  deleteProductByIdSchema,
  getAllProductsSchema,
  getProductByIdSchema,
  UpdateProductByIdSchema,
} from "../validators/products.validator";
import { authorizeRole } from "../middlewares/role.middleware";

const router = express.Router();

router.get("/", validate(getAllProductsSchema), asyncHandler(getProducts));
router.post("/", validate(addProductSchema), asyncHandler(addProduct));
router.get(
  "/:id",
  validate(getProductByIdSchema),
  asyncHandler(getProductById),
);
router.put(
  "/:id",
  authorizeRole("admin"),
  validate(UpdateProductByIdSchema),
  asyncHandler(updateProductById),
);
router.delete(
  "/:id",
  validate(deleteProductByIdSchema),
  asyncHandler(deleteProductById),
);

export default router;
