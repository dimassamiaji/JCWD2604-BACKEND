/** @format */

import express, { Response, Request, Router } from "express";
import { expensesController } from "../controllers/expenses";

export const route: Router = express.Router();
route.get("/", expensesController.getAll); //get all expenses
route.get("/date-range", expensesController.getByDateRange); //get by dates
route.get("/category", expensesController.getByCategory); //get by category
route.get("/:id", expensesController.getById); //get by id

route.patch("/:id", expensesController.editExpense); //edit expense
route.post("/", expensesController.createExpense); //create expense
route.delete("/:id", expensesController.deleteExpense); //delete expense
