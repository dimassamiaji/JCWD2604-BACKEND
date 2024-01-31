/** @format */
import express, { NextFunction, Response, Request } from "express";
import db from "../config/db";

export const userController = {
  login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.query;
    const qString = `select id,email,first_name,last_name from users where email='${email}' and password='${password}'`;
    return db.query(qString, (err, result) => {
      if (err) return res.status(500).send(err.message);
      return res.send({
        message: "login berhasil",
        data: result,
      });
    });
  },
  register(req: Request, res: Response, next: NextFunction) {
    const { email, password, first_name, last_name } = req.body;

    const qString = `insert into users (email,password,first_name,last_name) values('${email}','${password}','${first_name}','${last_name}')`;
    return db.query(qString, (err, result) => {
      if (err) return res.status(500).send(err.message);
      return res.send({
        message: "register berhasil",
      });
    });
  },
};
