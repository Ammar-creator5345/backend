import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const validateProductId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Id is invalid",
    });
  }
  next();
};
