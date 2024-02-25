/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { ReqUser } from "../middlewares/auth-middleware";
import moment from "moment";
import { Prisma } from "@prisma/client";
export const transactionController = {
  async createTransaction(req: ReqUser, res: Response, next: NextFunction) {
    try {
      await prisma.$transaction(async (prisma) => {
        const carts = await prisma.cart.findMany({
          include: {
            product: true,
          },
          where: {
            userId: req.user?.id,
          },
        });

        const no_invoice = `INV_${moment().format("YYYYMMDDhhmmss")}_${
          req.user?.id
        }`;

        const transactionHeader = await prisma.transaction.create({
          data: {
            no_invoice,
            user: {
              connect: {
                id: req.user?.id,
              },
            },
            address: {
              connect: {
                id: req.body.address_id,
              },
            },
          } as Prisma.TransactionCreateInput,
        });

        const transdetails = carts.map(({ qty, product }) => {
          return {
            qty,
            price: product?.price,
            productId: product.id,
            transactionId: transactionHeader.id,
          };
        });
        console.log(transdetails);

        await prisma.transactionDetail.createMany({
          data: transdetails as [],
        });

        console.log("masuk");

        await prisma.cart.deleteMany({
          where: {
            userId: req.user?.id,
          },
        });
      });

      res.send({
        message: "transaksi berhasil dibuat",
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  },
};
