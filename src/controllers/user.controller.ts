import userModel from "../models/user.model";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userModel
    .find()
    // .select("-password -createdAt -updatedAt -__v")
    // .lean();

  res.status(200).json({
    success: true,
    message: "All users fetched successfully",
    data: {
      users,
    },
  });
};
