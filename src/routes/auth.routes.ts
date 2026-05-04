import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { authorizeRole } from "../middlewares/role.middleware";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/auth.validator";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

const router: Router = express.Router();

router.post(
  "/register",
  validate(registerUserSchema),
  asyncHandler(registerUser),
);
router.post("/login", validate(loginUserSchema), asyncHandler(loginUser));

export default router;
