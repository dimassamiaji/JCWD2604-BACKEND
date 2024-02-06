/** @format */

import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

export const productController = {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { product_name } = req.query;
      const products = await prisma.product.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              first_name: true,
              last_name: true,
            },
          },
        },
        where: {
          product_name: {
            contains: String(product_name),
          },
        },
      });

      res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findUnique({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              first_name: true,
              last_name: true,
            },
          },
        },
        where: {
          id: Number(req.params.id),
        },
      });

      res.send({
        success: true,
        result: products,
      });
    } catch (error) {
      next(error);
    }
  },
  async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { product_name, image_url, price, description } = req.body;
      const editProduct: Prisma.ProductUpdateInput = {
        product_name,
        image_url,
        price,
        description,
      };

      await prisma.product.update({
        data: editProduct,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
};
