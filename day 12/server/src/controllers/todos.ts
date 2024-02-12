/** @format */
import { Request, Response, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middlewares/verify-user";
export const todoController = {
  async create(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const newData: Prisma.TodoCreateInput = {
        title,
        description,
        user: {
          connect: {
            id: req.user?.id,
          },
        },
      };

      await prisma.todo.create({
        data: newData,
      });

      res.status(201).send({
        message: "data berhasil dibuat",
      });
    } catch (error) {
      next(error);
    }
  },
  async read(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId: String(req.user?.id),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      res.send({
        message: "fetch todo list",
        result: todos,
      });
    } catch (error) {
      next(error);
    }
  },
  async update(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.todo.update({
        data: req.body,
        where: {
          id,
        },
      });

      res.send({
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await prisma.todo.delete({
        where: {
          id,
        },
      });

      res.send({
        message: "data berhasil dihapus",
      });
    } catch (error) {
      next(error);
    }
  },
};
