import { NextFunction, Response, Request } from "express";
import path from "path";
import z, { ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req);
      next();
    } catch (err: any) {
      const storeError: Record<string, string> = {};
      err.issues.forEach((err: any) => {
        const field = err.path[err.path.length - 1];
        storeError[field] = err.message;
        return storeError;
      });
      return res.status(400).json({
        message: "Validation failed",
        error: storeError,
      });
    }
  };
};
