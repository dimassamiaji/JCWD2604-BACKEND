/** @format */

import moment from "moment";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

export const writeLog = (req: Request, res: Response, next: NextFunction) => {
  const msg = moment().format("YYYY-MM-DD HH:mm:ss");
  fs.appendFile(__dirname + "/../log/log.txt", msg + "\n", (err) =>
    console.log(err)
  );
  next();
};
