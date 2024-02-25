/** @format */
import { Response, NextFunction, Request } from "express";
import { ReqUser } from "../middlewares/auth-middleware";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
export const cartController = {
  async getCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const carts = await prisma.cart.findMany({
        include: {
          user: true,
          product: {
            include: {
              stock: {
                select: {
                  stock_qty: true,
                },
              },
            },
          },
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
  async addToCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { productId, qty } = req.body;
      const checkCart = await prisma.cart.findFirst({
        where: {
          userId: Number(req.user?.id),
          productId: Number(productId),
        },
      });
      const checkStock = await prisma.stock.findFirst({
        where: {
          productId: Number(productId),
        },
      });

      if (
        Number(checkStock?.stock_qty) <
        Number(qty) + Number(checkCart?.qty || 0)
      ) {
        throw Error("qty melebihi stock");
      }
      const data: Prisma.CartCreateInput = {
        qty: Number(qty) + Number(checkCart?.qty || 0),
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: Number(req.user?.id),
          },
        },
      };

      if (checkCart) {
        console.log(checkCart);

        await prisma.cart.update({
          data,
          where: {
            userId_productId: {
              userId: Number(req.user?.id),
              productId: Number(productId),
            },
          } as Prisma.CartWhereUniqueInput,
        });
      } else {
        await prisma.cart.create({
          data,
        });
      }

      return res.send({
        message: "Product berhasil ditambahkan ke Cart",
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
  async updateToCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { productId, qty } = req.body;

      const checkStock = await prisma.stock.findFirst({
        where: {
          productId: Number(productId),
        },
      });

      if (Number(checkStock?.stock_qty) < Number(qty)) {
        throw Error("qty melebihi stock");
      }

      const data: Prisma.CartCreateInput = {
        qty,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: Number(req.user?.id),
          },
        },
      };
      await prisma.cart.update({
        data,
        where: {
          userId_productId: {
            userId: Number(req.user?.id),
            productId: Number(productId),
          },
        } as Prisma.CartWhereUniqueInput,
      });
      return res.send({
        message: "Cart berhasil diupdate",
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteCart(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      await prisma.cart.delete({
        where: {
          userId_productId: {
            userId: Number(req.user?.id),
            productId: Number(productId),
          },
        },
      });
      return res.send({
        message: "Cart telah dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
