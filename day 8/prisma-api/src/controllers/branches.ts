/** @format */
import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

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
      next(err);
    }
  },
  async read(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany();
      return res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },
  async filterBranch(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany({
        where: {
          name: {
            contains: String(req.query.name), //like
          },
        },
      });

      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },
  async branchClass(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany({
        select: {
          name: true,
          location: true,
          Class: {
            select: {
              name: true,
              startAt: true,
              endAt: true,
            },
            // where: {
            //   name: "JCDS",
            // },
          },
        },
        // include: {
        //   Class: true,
        // },
      });

      res.send({
        success: 1,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },

  async addClassAndBranch(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.$transaction(async (prisma) => {
        const newBranch: Prisma.BranchCreateInput = {
          name: req.body.branch_name,
          location: req.body.location,
        };

        const transBranch = await prisma.branch.create({
          data: newBranch,
        });

        const newClass: Prisma.ClassCreateInput = {
          name: req.body.class_name,
          startAt: new Date(req.body.startAt),
          endAt: new Date(req.body.endAt),
          Branch: { connect: transBranch },
        };
        await prisma.class.create({
          data: newClass,
        });
      });

      await branchController.branchClass(req, res, next);
    } catch (err) {
      next(err);
    }
  },

  async paging(req: Request, res: Response, next: NextFunction) {
    try {
      const take = 1;
      const skip = (Number(req.query.page) - 1) * take;
      const branch = await prisma.branch.findMany({
        skip,
        take,
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },
  async selectNameLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findMany({
        select: {
          name: true,
          location: true,
        },
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      next(err);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const branch = await prisma.branch.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        result: branch,
      });
    } catch (err) {
      next(err);
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
      next(err);
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
      next(err);
    }
  },
};
