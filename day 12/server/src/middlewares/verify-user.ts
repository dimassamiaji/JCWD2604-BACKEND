/** @format */

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma, secretKey } from "..";

export interface ReqUser extends Request {
  user?: TUser;
}

type TUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export const verifyUser = async (
  req: ReqUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("token not found");
    const userToken = verify(token, String(secretKey)) as TUser;
    const checkUser = (await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
      where: {
        email: userToken.email,
      },
    })) as TUser;

    req.user = checkUser as TUser;
    next();
  } catch (error) {
    next(error);
  }
};
