import userModel from "../models/user.model";
import { LoginUserService, RegisterUserService } from "../types/auth.types";
import { AppError } from "../utils/AppError";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

export const registerUserService = async ({
  name,
  email,
  password,
  role,
  age,
}: RegisterUserService) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new AppError("User with this email already exists", 409);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    email,
    password: hashPassword,
    role,
    age,
  });
  const token = generateToken(newUser._id.toString(), newUser.role);
  return { token, user: newUser };
};

export const loginUserService = async ({
  email,
  password,
}: LoginUserService) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    throw new AppError("Invalid email or password", 400);
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      throw new AppError("Incorrect password", 400);
    }

    const token = generateToken(existingUser._id.toString(), existingUser.role);
    return { token, user: existingUser };
  }
};
