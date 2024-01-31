/** @format */

import express, { Router } from "express";
export const route: Router = express.Router();
route.get("/");
route.post("/");
route.patch("/:id");
route.delete("/:id");
