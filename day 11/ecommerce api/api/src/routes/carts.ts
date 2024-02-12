/** @format */

import express, { Router } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import { cartController } from "../controllers/carts";
export const route: Router = express.Router();
route.get("/", verifyUser, cartController.getCart);
