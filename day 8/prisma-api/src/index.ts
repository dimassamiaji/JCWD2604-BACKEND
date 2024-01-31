/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";

export const prisma = new PrismaClient();

const app: Application = express();
app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    success: false,
    message: error.message,
  });
});

app.use("/branches", routes.branchRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
