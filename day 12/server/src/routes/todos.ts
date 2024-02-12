/** @format */

import express, { Router } from "express";
import { todoController } from "../controllers/todos";
export const route: Router = express.Router();
route.get("/", todoController.read);
route.post("/", todoController.create);
route.patch("/:id", todoController.update);
route.delete("/:id", todoController.delete);
