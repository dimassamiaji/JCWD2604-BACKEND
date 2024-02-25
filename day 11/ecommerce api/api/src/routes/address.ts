/** @format */

import express, { Router } from "express";
import { verifyUser } from "../middlewares/auth-middleware";
import { addressController } from "../controllers/Address";

export const route: Router = express.Router();
route.get("/province", addressController.getProvince);
route.get("/city/:provinceId", addressController.getCity);
