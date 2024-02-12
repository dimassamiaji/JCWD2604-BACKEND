/** @format */
import { Response, NextFunction, Request } from "express";
import { ReqUser } from "../middlewares/auth-middleware";
import { prisma } from "..";
export const cartController = {
  async getCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const carts = await prisma.cart.findMany({
        include: {
          user: true,
          product: true,
        },
        where: {
          userId: req.user?.id,
        },
      });

      res.send({
        message: "fetch cart",
        result: carts,
      });
    } catch (error) {
      next(error);
    }
  },
};
