/** @format */

import express, { Response, Request, Application, NextFunction } from "express";
import { routes } from "./routes";

const app: Application = express();
const PORT = 8000;
app.use(express.json());

//routes
app.use("/expenses", routes.expensesRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message || "internal server error" });
}); //error handler

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("page not found"); //page not found handler
});

app.listen(PORT, () => {
  console.log("app runs on port", PORT);
});
