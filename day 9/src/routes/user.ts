/** @format */

import express, { Router } from "express";
import { userController } from "../controllers/user";
export const route: Router = express.Router();
route.get("/", userController.login);
route.post("/", userController.register);
