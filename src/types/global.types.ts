import { Request } from "express";

export interface ExtendedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export interface CustomError extends Error {
  statusCode: number;
}
