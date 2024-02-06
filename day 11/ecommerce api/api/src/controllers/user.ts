/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from ".."; //accessing model
import { Prisma } from "@prisma/client"; // accessing interface/types

import { genSalt, hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

type TUser = {
  email: string;
};

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, first_name, last_name, gender } = req.body;
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        gender,
      };

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("user sudah terdaftar");

      await prisma.user.create({
        data: newUser,
      });
      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;

      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });
      if (!user) throw Error("email/password salah");
      const checkPassword = await compare(String(password), user.password);
      const resUser = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        role: user.role,
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "5m",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
      // npm i jsonwebtoken @types/jsonwebtoken

      throw Error("email/password tidak sesuai");
    } catch (error) {
      next(error);
    }
  },
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;

      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.UserUpdateInput = {
        password: hashedPassword,
      };
      await prisma.user.update({
        data: userEditPassword,
        where: {
          email: String(email),
        },
      });
      res.send({
        success: true,
        message: "berhasil merubah password",
      });
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          gender: true,
          first_name: true,
          last_name: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "5m",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
