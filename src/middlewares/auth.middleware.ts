import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface jwtPayloadType {
  id: string;
  role: string;
}
interface AuthenticatedRequest extends Request {
  user?: jwtPayloadType;
}

export const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new AppError("Unauthorized Request", 401));
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwtPayloadType;
    req.user = {
      role: decoded.role,
      id: decoded.id,
    };
    next();
  } catch (err) {
    return next(new AppError("Token invalid or expired", 401));
  }
};
