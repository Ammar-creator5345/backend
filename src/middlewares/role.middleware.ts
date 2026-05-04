import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../types/global.types";
import { AppError } from "../utils/AppError";

export const authorizeRole = (...roles: string[]) => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError("Access denied", 403));
    }
    next();
  };
};
