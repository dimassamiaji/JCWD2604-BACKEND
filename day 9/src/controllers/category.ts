/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma } from "..";

export const categoryController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.category.create({
        data: req.body,
      });
      res.send({
        success: "true",
        message: "data berhasil dibuat",
      });
    } catch (error) {
      next(error);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany({});
      res.send({
        success: "true",
        result: categories,
      });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.category.update({
        data: req.body,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: "true",
        message: "data berhasil diupdate",
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.category.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: "true",
        message: "data berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
