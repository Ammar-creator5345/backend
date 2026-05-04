import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb_Uri = process.env.MONGODB_URI;

const mongodbConnect = async () => {
  try {
    await mongoose.connect(mongodb_Uri!);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log("Couldn't connect to mongodb due to error", err);
    process.exit(1);
  }
};

export default mongodbConnect;
