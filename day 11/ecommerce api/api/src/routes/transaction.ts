/** @format */

import express, { Router } from "express";
import { transactionController } from "../controllers/transaction";
import { verifyUser } from "../middlewares/auth-middleware";
export const route: Router = express.Router();
route.post("/", verifyUser, transactionController.createTransaction);
