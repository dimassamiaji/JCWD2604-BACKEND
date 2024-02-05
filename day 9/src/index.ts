/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import { verifyUser } from "./middlewares/auth-middleware";

export const prisma = new PrismaClient();

export const secretKey = "rahasia";

const app: Application = express();
app.use(express.json());

//routes
app.use("/users", routes.userRoutes);
app.use("/articles", verifyUser, routes.articleRoutes);
app.use("/categories", routes.categoryRoutes);

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
