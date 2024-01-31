/** @format */

import express, { Application, Response, Request } from "express";
import { routes } from "./routes";
import db from "./config/db";

const app: Application = express();
app.use(express.json());
app.use("/users", routes.UserRoutes);

db.getConnection((err, connection) => {
  if (err) return console.log(err);
  console.log("db connected");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("api is running on port", PORT);
});
