/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { routes } from "./routes";
import cors from "cors";
import { config } from "dotenv";
import Redis from "ioredis";
export const client = Redis.createClient();
client.on("error", () => {
  client.disconnect();
});
config();

export const prisma = new PrismaClient();

export const secretKey = String(process.env.secretKey);
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/products",
  express.static(`${__dirname}/public/images/product_images`)
);

const PORT = process.env.PORT;

//routes
app.use("/users", routes.userRoutes);
app.use("/products", routes.productRoutes);
app.use("/carts", routes.cartRoutes);
app.use("/transactions", routes.transactionRoutes);
app.use("/addresses", routes.addressRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
}); //error handler

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found"); //page not found handler
});

app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
