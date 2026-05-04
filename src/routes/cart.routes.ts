import express, { Router } from "express";
import { updateCart, addToCart, getCart } from "../controllers/cart.controller";
import {
  addToCartSchema,
  updateCartSchema,
} from "../validators/cart.validator";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

const router: Router = express.Router();

router.get("/", asyncHandler(getCart));
router.post("/", validate(addToCartSchema), asyncHandler(addToCart));
router.put("/", validate(updateCartSchema), asyncHandler(updateCart));

export default router;
