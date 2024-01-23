/** @format */

export type product = {
  id: number;
  productName: string;
  stock: number;
  description: string;
};

type products = product[];

export const products: products = [
  {
    id: 1,
    productName: "keripik",
    stock: 2,
    description: "keripik bawang",
  },
  {
    id: 2,
    productName: "tango",
    stock: 1,
    description: "tango biru",
  },
];
