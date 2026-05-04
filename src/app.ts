import express, { Express } from "express";
import userRoutes from "../src/routes/user.routes";
import authRoutes from "../src/routes/auth.routes";
import productRoutes from "../src/routes/products.routes";
import { protect } from "./middlewares/auth.middleware";
import { authorizeRole } from "./middlewares/role.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import cartRoutes from "../src/routes/cart.routes";
import orderRoutes from "../src/routes/order.routes";

const app: Express = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", protect, productRoutes);
app.use("/api/cart", protect, cartRoutes);
app.use("/api/order", protect, orderRoutes);

app.use(errorHandler);

export default app;
