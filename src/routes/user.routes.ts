import express, { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/", getUsers);

export default router;
