/** @format */
import { Request, Response, NextFunction } from "express";
import { prisma } from "..";

export const branchController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.branch.create({
        data: req.body,
      });
      return res.status(201).send({
        success: true,
        message: "data branch berhasil dibuat",
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany();
      return res.send({
        success: true,
        result: branch,
      });
    } catch (err: any) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.branch.update({
        data: req.body,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diupdate",
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.branch.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil dihapus",
      });
    } catch (err) {
      if (err instanceof Error) throw Error(err.message);
    }
  },
};
