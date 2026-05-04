import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const { token, user } = await registerUserService(req.body);
  res.status(201).json({
    success: true,
    message: "User created Successfully",
    data: {
      token,
      user,
      expiresIn: "2 days",
    },
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { token, user } = await loginUserService(req.body);
  res.status(200).json({
    success: true,
    message: "Login successfull",
    data: {
      token,
      user,
      expiresIn: "2 days",
    },
  });
};
