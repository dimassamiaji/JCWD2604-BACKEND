/** @format */

import express, { Router, Request, Response, NextFunction } from "express";
import { userController } from "../controllers/users";

export const route: Router = express.Router();

route.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini user routes");
});

route.get("/detail", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini detail");
});

route.post("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini user post");
});

route.get("/all", userController.getAll);
