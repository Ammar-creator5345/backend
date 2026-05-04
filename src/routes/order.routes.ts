import Express from "express";
import {
  checkOut,
  createOrder,
  updateOrder,
  getOrderHistory,
  getOrder,
  cancelOrder,
} from "../controllers/order.controller";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  cancelOrderSchema,
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} from "../validators/orders.validator";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Express.Router();

router.post("/", validate(createOrderSchema), asyncHandler(createOrder));
router.post("/checkout", asyncHandler(checkOut));
// router.get("/:orderId", validate(getOrderSchema), asyncHandler(getOrder));
router.put(
  "/:orderId/status",
  validate(updateOrderSchema),
  authorizeRole("admin"),
  asyncHandler(updateOrder),
);
router.put(
  "/:orderId/cancel",
  validate(cancelOrderSchema),
  asyncHandler(cancelOrder),
);
router.get("/history", asyncHandler(getOrderHistory));

export default router;
