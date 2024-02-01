/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";

export const prisma = new PrismaClient();

const app: Application = express();
app.use(express.json());

//routes
app.use("/branches", routes.branchRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
}); //error handler

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found"); //page not found handler
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
