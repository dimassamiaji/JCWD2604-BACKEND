/** @format */

import express, { Router } from "express";
import { categoryController } from "../controllers/category";
export const route: Router = express.Router();

route.get("/", categoryController.read);
route.post("/", categoryController.create);
route.patch("/:id", categoryController.update);
route.delete("/:id", categoryController.delete);
