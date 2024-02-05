/** @format */

import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";

type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
};

interface ReqUser extends Request {
  user?: TUser;
}

export const verifyUser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = req.header("Authorization")?.replace("Bearer ", "");
    const token = req.headers.authorization;
    if (!token) throw Error("unauthorized");

    const verifyToken = verify(String(token), secretKey) as TUser;

    const user = await prisma.user.findUnique({
      where: {
        email: verifyToken?.email,
      },
    });
    console.log(user);

    req.user = user as TUser;
    next();
  } catch (err) {
    next(err);
  }
};
