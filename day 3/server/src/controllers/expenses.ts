/** @format */
import { Response, Request, Router, NextFunction } from "express";
// import { expenses } from "../data/data.json";
import moment from "moment";
import fs from "fs";

// import { expenses } from "../data/data.json";

const path = __dirname + "/../data/data.json";
let dt = JSON.parse(fs.readFileSync(path, "utf8"));
const expenses: TExpense[] = dt.expenses || [];
console.log(expenses);

//tsc --init

const syncFile = () => fs.writeFileSync(path, JSON.stringify(dt));
type TExpense =
  | {
      id: number;
      expense: string;
      category: string;
      nominal: number;
      date: Date | string;
    }
  | undefined;

export const expensesController = {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.send({ message: "get all expenses", data: expenses });
  },
  getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data: TExpense = expenses.find(
      (expense) => expense?.id == Number(id)
    );
    res.send({ message: "get expense by id", data });
  },
  getByDateRange(req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    const startDate = new Date(String(query.startDate)); //2023-1-1
    const endDate = new Date(String(query.endDate)); // 2023-

    const data: number = expenses.reduce((sum, current) => {
      const date = new Date(current?.date || "");

      console.log(startDate, endDate, date, current?.id);

      if (date >= startDate && date <= endDate)
        return sum + Number(current?.nominal);
      else return sum;
    }, 0);

    if (!data) throw Error("data tidak ditemukan");

    res.send({
      message:
        "filter by date from " +
        moment(startDate).format("YYYY-MM-DD") +
        " to " +
        moment(endDate).format("YYYY-MM-DD"),
      total: data,
    });
  },
  getByCategory(req: Request, res: Response, next: NextFunction) {
    const { category } = req.query;
    const data: number = expenses.reduce((sum, current) => {
      if (current?.category == category) return sum + Number(current?.nominal);
      else return sum;
    }, 0);
    if (!data) throw Error("data tidak ditemukan");

    res.send({ message: "category " + category, total: data });
  },
  editExpense(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;

    const index = expenses.findIndex((expense) => expense?.id == Number(id));

    if (index == -1) throw Error("id tidak ditemukan");
    const exp = expenses[index];
    // {
    //   "id": 1,
    //   "expense": "makan bubur",
    //   "date": "2022-12-31T17:00:00.000Z",
    //   "nominal": 1000,
    //   "category": "food"
    // }
    const edited: TExpense = {
      id: Number(id),
      expense: String(body?.expense || exp?.expense),
      date: new Date(body?.date || exp?.date),
      nominal: Number(body?.nominal || exp?.nominal),
      category: String(body?.category || exp?.category),
    };
    expenses.splice(index, 1, edited);
    syncFile();
    res.send({
      message: "data berhasil diedit",
    });
  },
  createExpense(req: Request, res: Response, next: NextFunction) {
    const { category, expense, date, nominal } = req.body;
    // console.log(expenses, "ini");

    const id = Number(expenses[expenses.length - 1]?.id || 0) + 1;
    // console.log(new Date(date));

    const newData: TExpense = {
      id,
      expense,
      category,
      date: new Date(date),
      nominal: Number(nominal),
    };
    expenses.push(newData);

    syncFile();
    res.send({
      message: "data berhasil ditambahkan",
    });
  },
  deleteExpense(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const index = expenses.findIndex((expense) => expense?.id == Number(id));
    // console.log(index);
    if (index == -1) throw Error("id tidak ditemukan");

    expenses.splice(index, 1);
    fs.writeFileSync(path, JSON.stringify({ ...dt, expenses }));

    res.send({ message: "data berhasil dihapus" });
  },
};
