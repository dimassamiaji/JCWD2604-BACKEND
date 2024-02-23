/** @format */

import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
export const route: Router = express.Router();
route.get(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const users = await prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    res.send({
      message: "ok",
      //   users: ["User 1", "User 2", "User 3"],
      users,
    });
  }
);
