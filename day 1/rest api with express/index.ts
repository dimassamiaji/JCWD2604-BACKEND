/** @format */

import express, { Request, Response, Application } from "express";

const PORT = 8000;
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello",
  });
});

app.get("/api", (req: Request, res: Response) => {
  const { query } = req; // query params
  res.status(200).send({
    messsage: " ini api",
    query,
  });
});

app.get("/api/:id/:id2", (req: Request, res: Response) => {
  const { params, query } = req; //route params
  res.status(200).send({
    messsage: " ini api",
    params,
    query,
  });
});

type TUser = {
  id: number;
  name: string;
};
type TUsers = TUser[];

const users: TUsers = [
  {
    id: 1,
    name: "udin",
  },
  {
    id: 2,
    name: "ujang",
  },
  {
    id: 3,
    name: "naruto",
  },
];
app.get("/users", (req: Request, res: Response) => {
  res.send({
    message: "fetch user data",
    users,
  });
});

app.patch("/users/:id", (req: Request, res: Response) => {
  const { params, body } = req;
  const index = users.findIndex((val) => {
    return val.id == Number(params?.id);
  });
  users[index].name = body.name;

  return res.send({
    message: "user berhasil diedit",
    user: users[index],
  });
});

app.post("/api", (req: Request, res: Response) => {
  const { body } = req; // req.body
  console.log(body);
  res.status(201).send({
    message: "ini post api",
    body,
  });
});

app.listen(PORT, () => {
  console.log("app runs on port " + PORT);
});
