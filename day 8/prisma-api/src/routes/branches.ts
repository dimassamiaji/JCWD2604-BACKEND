/** @format */

import express, { Router } from "express";
import { branchController } from "../controllers/branches";
export const route: Router = express.Router();
route.get("/", branchController.read);
route.get("/name-location", branchController.selectNameLocation);
route.get("/filter", branchController.filterBranch);
route.get("/pagination", branchController.paging);
route.get("/branch-class", branchController.branchClass);

route.get("/:id", branchController.getById);

route.post("/", branchController.create);
route.post("/branch-class", branchController.addClassAndBranch);

route.patch("/:id", branchController.update);
route.delete("/:id", branchController.delete);
