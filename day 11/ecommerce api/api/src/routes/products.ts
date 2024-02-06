/** @format */

import express, { Router } from "express";
import { productController } from "../controllers/products";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
export const route: Router = express.Router();
route.get("/", productController.getProducts);
route.get("/:id", productController.getProductById);
route.patch("/:id", verifyUser, verifyAdmin, productController.editProduct);

// route.post("/");
// route.delete("/:id");
