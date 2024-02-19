/** @format */

import express, { Router } from "express";
import { userController } from "../controllers/users";
import { verifyUser } from "../middlewares/verify-user";
export const route: Router = express.Router();
route.post("/v1", userController.login); //login
route.post("/v2", userController.register); //register
route.get("/v3", verifyUser, userController.keepLogin); //keep-login
