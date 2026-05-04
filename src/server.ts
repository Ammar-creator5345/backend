import app from "./app";
import { config } from "dotenv";
import mongodbConnect from "./config/db";
import blogModel from "./models/user.model";

config();
const port = process.env.PORT || 3000;

mongodbConnect();
app.listen(port, () => {
  console.log("Server is runnig on port: " + port);
});
