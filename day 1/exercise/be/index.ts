/** @format */

import express, { Request, Response, Application } from "express";
import { product, products } from "./data";
import cors from "cors";
const app: Application = express();
const PORT = 8000;

app.use(express.json());
app.use(cors()); //

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to exercise API");
});
// npm i --save-dev @types/cors

//Create
app.post("/products", (req: Request, res: Response) => {
  const { productName, stock, description } = req.body; //data dari req.body
  const newProduct: product = {
    id: products[products.length - 1].id + 1,
    productName,
    stock,
    description,
  }; //template new Product sesuai dengan data di array
  products.push(newProduct); //push new data ke dalam array

  return res.send({
    message: "data berhasil ditambahkan",
    newData: newProduct,
  });
});

//Read
// app.get("/products", (req: Request, res: Response) => {
//   return res.send({
//     message: "data produk total " + products.length,
//     data: products,
//   });
// });

//Filter
app.get("/products", (req: Request, res: Response) => {
  const search = req.query.productName ? String(req.query.productName) : "";
  console.log(search);

  const filteredProduct = products.filter((produk) =>
    produk.productName.includes(search)
  );

  return res.send({
    message: "data produk total " + products.length,
    data: filteredProduct,
  });
});
//npm i express @types/express

//Update
app.patch("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params; // get id dari params
  const { body } = req; // ambil data dari req.body
  const index = products.findIndex((produk) => produk.id == Number(id)); //cari index produk sesuai dengan id
  if (index == -1)
    return res.status(500).send({
      message: "id tidak ditemukan",
    }); //pada saat id tidak ketemu, maka return error

  const editProduct: product = {
    id: products[index].id, //id tidak dapat diubah dari req.body
    productName: body.productName || products[index].productName,
    stock: body.stock || products[index].stock,
    description: body.description || products[index].description,
  };

  products[index] = editProduct; //update value ke dalam data produk

  return res.send({
    message: "data berhasil diupdate",
    data: products[index],
  }); //tampilakn response dari produk
});

//Delete
app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = products.findIndex((produk) => produk.id == Number(id)); //cari index produk sesuai dengan id
  if (index == -1)
    return res.status(500).send({
      message: "id tidak ditemukan",
    }); //pada saat id tidak ketemu, maka return error

  products.splice(index, 1);
  res.send({
    message: "data berhasil dihapus",
  });
});

app.listen(PORT, () => {
  console.log("app runs on port " + PORT);
});
