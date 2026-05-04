import mongoose from "mongoose";
import { Roles } from "../constants/global.constant";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: Roles,
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
    delete ret.updatedAt;
    delete ret.createdAt;
    return ret;
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
