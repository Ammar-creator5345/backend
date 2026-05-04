import { NextFunction, Response, Request } from "express";
import { CustomError } from "../types/global.types";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server Error",
  });
};

export default errorHandler;
