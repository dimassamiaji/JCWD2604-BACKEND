/** @format */

import express, { Response, Request, Application, NextFunction } from "express";
import userRoutes from "./routes/users";
import { writeLog } from "./middlewares/write-log";

const app: Application = express();
const PORT = 8001;

app.use(writeLog);

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to api");
});

app.get("/ab?cd", (req: Request, res: Response) => {
  res.send("ab?cd"); //acd, abcd
});

app.get("/ab+cd", (req: Request, res: Response) => {
  res.send("ab+cd"); // abcd, abbcd, abbbbcd, and so on
});

app.get("/ab*cd", (req: Request, res: Response) => {
  res.send("ab*cd"); //abcd, abxcd, abTESTcd,and so on
});

app.get("/ab(cd)?e", (req: Request, res: Response) => {
  res.send("/ab(cd)?e"); //abcde, abe
});

// app.get(/a, (req: Request, res: Response) => {
//   res.send("/a/"); //regex a, apapun huruf a di dalam route
// });

app.get(/.*fly$/, (req: Request, res: Response) => {
  res.send("/.*fly$/"); //dragonfly, butterfly, but not butterflyman or dragonflyman
});

app.get("/example/a", (req: Request, res: Response) => {
  res.send("hello from a");
});

app.get(
  "/example/b",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("lanjut ke next function");
    next();
  },
  (req: Request, res: Response) => {
    res.send("ini adalah next function");
  }
);

app.get(
  "/example/c",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("lanjut ke next function");
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log("lanjut terus");
    res.send("ini cb2");
    next();
  },
  (req: Request, res: Response) => {
    res.send("ini adalah next function");
  }
);

app.use("/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).send("something broke");
});

app.listen(PORT, () => {
  console.log("api berjalan di port " + PORT);
});
