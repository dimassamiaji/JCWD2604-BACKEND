/** @format */

import { Request, Response, NextFunction } from "express";

export const userController = {
  getAll(req: Request, res: Response) {
    return res.send("ini user handler hehe");
  },
  downloadText(req: Request, res: Response) {
    res.download(__dirname + "/../public/text.txt", (err) => console.log(err));
  },
  getAll2(req: Request, res: Response, next: NextFunction) {
    try {
      throw Error("error");
      return res.json("ini user handler hehe");
    } catch (err) {
      next(err);
    }
  },
};
