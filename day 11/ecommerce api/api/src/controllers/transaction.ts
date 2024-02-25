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
        const { provinceId, cityId, address, postal_code } = req.body;
        const checkAddress = await prisma.address.findFirst({
          where: {
            provinceId: Number(provinceId),
            cityId: Number(cityId),
            userId: req.user?.id,
          },
        });
        console.log(checkAddress);

        let addressId;
        if (!checkAddress) {
          const newAddress = await prisma.address.create({
            data: {
              user: {
                connect: {
                  id: Number(req.user?.id),
                },
              },
              postal_code: Number(postal_code),
              address,
              province: {
                connect: {
                  id: Number(provinceId),
                },
              },
              city: {
                connect: {
                  id: Number(cityId),
                },
              },
            } as Prisma.AddressCreateInput,
          });
          addressId = newAddress.id;
        }
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
                id: checkAddress?.id || addressId,
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
