/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { TUser, ReqUser } from "../middlewares/auth-middleware";
export const articleController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.article.create({
        data: req.body,
      });
      res.send({
        success: true,
        message: "data berhasil ditambah",
      });
    } catch (error) {
      next(error);
    }
  },
  async read(req: ReqUser, res: Response, next: NextFunction) {
    try {
      // [ {
      //     title : "",
      //     content : "",
      //     user : {
      //         first_name : "",
      //         last_name : ""
      //     },
      //     article_categories : [
      //         {
      //             category : {
      //                 category: ""
      //             }
      //         }
      //     ]
      // }]

      // select * from article a
      // join user u on u.id = a.authorId
      // join article_categories ac on ac.articleId = a.id
      // join category c on c.id = ac.categoryId

      console.log(req.user);

      let articles = await prisma.article.findMany({
        select: {
          title: true,
          content: true,
          user: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
          article_categories: {
            select: {
              category: {
                select: {
                  category: true,
                },
              },
            },
          },
        },
      });

      res.send({
        success: true,
        result: articles,
      });
    } catch (error) {
      next(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;
      const editArticle: Prisma.ArticleUpdateInput = {
        content,
        title,
      };

      await prisma.article.update({
        data: editArticle,
        where: { id: Number(req.params.id) },
      });
      res.send({
        success: true,
        message: "data berhasil diupdate",
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.article.delete({
        where: { id: Number(req.params.id) },
      });
      res.send({
        success: true,
        message: "data berhasil didelete",
      });
    } catch (error) {
      next(error);
    }
  },
};
