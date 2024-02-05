/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma, secretKey } from "..";
import { Prisma } from "@prisma/client";

import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, first_name, last_name, gender } = req.body;
      //password = ayam
      //password = ayamasdasfgna
      const salt = await genSalt(10);

      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        gender,
      };

      const checkUser = await prisma.user.findMany({
        where: {
          email,
        },
      });

      if (checkUser.length > 0) throw Error("user sudah terdaftar");

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
      };
      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "1hr",
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
};
