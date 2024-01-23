/** @format */

import fs from "fs";
import moment from "moment";
import { Request, Response, NextFunction } from "express";

export const writeLog = (req: Request, res: Response, next: NextFunction) => {
  const message = moment().format("YYYY-MM-DD HH:mm:ss "); //2024-01-23 15:59:55
  fs.appendFile(
    __dirname + "/../log/log.txt",
    message + req.url + "\n",
    (err) => console.log(err)
  );
  next();
};
