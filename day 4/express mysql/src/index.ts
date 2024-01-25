/** @format */

import express, { Response, Request, Application, NextFunction } from "express";
const PORT = 9000;
import db from "./config/db";
const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("test");
});

//check db connection
db.getConnection((err, connection) => {
  if (err) return console.log(err);
  console.log("db connected");
});

type TPerson = {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
};

app.get("/persons", (req: Request, res: Response, next: NextFunction) => {
  const queryString = "select * from Persons";
  return db.query(queryString, (err, result: TPerson[]) => {
    if (err) return res.status(500).send(err.message);
    return res.send(result);
  });
});

app.listen(PORT, () => {
  console.log("app runs on port", PORT);
});
