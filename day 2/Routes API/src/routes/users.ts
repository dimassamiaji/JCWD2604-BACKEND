/** @format */

import express, { Router, Request, Response } from "express";
import { userController } from "../controllers/users";
const userRoutes: Router = express.Router();

userRoutes.get("/", userController.getAll);
userRoutes.get("/download", userController.downloadText);
userRoutes.get("/2", userController.getAll2);

export default userRoutes;
