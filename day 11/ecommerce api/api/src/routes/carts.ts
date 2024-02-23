/** @format */

import express, { Router } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import { cartController } from "../controllers/carts";
export const route: Router = express.Router();
route.get("/", verifyUser, cartController.getCart);
route.post("/", verifyUser, cartController.addToCart);
route.patch("/", verifyUser, cartController.updateToCart);
route.delete("/:productId", verifyUser, cartController.deleteCart);
