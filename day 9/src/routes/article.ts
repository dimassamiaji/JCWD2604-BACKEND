/** @format */

import express, { Router } from "express";
import { articleController } from "../controllers/article";
export const route: Router = express.Router();
route.get("/", articleController.read);
route.post("/", articleController.create);
route.patch("/:id", articleController.update);
route.delete("/:id", articleController.delete);
