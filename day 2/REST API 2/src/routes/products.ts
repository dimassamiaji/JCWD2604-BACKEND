/** @format */

import express, { Router, Request, Response, NextFunction } from "express";

export const route: Router = express.Router();

route.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ini products");
});
