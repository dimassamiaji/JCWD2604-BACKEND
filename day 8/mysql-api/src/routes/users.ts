/** @format */

import express, { Router, Response, Request, NextFunction } from "express";
import { userController } from "../controllers/users";

export const route: Router = express.Router();

route.get("/", userController.login);

route.post("/", userController.register);
