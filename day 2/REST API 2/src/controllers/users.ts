/** @format */
import express, { Request, Response, NextFunction } from "express";

export const userController = {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.send("ini get all users");
  },
};
