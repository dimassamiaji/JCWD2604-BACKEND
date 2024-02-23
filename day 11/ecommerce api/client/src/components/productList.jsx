/** @format */
"use client";

import { useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../axios/axios";

import Search from "../assets/search.png";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "use-debounce";
import { InputComponent } from "./input";
import { Alert, Snackbar } from "@mui/material";
function ProductListComponent() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [value] = useDebounce(search, 500);

  const fetchProducts = () => {
    axiosInstance()
      .get("/products/", {
        params: {
          product_name: search,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
  }, [value]);

  const ps = useMemo(
    () => [...products].sort((a, b) => a.price - b.price),
    [products]
  );
  // const ps = [...products].sort((a, b) => a.price - b.price);

  // console.log(ps);
  return (
    <div className="w-full">
      <div className=" mt-5 px-7 max-w-screen-2xl  w-full  text-xs">
        <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2 ">
          <Image src={Search} alt="" className=" w-3 h-3" />
          <input
            type="text"
            placeholder="Type any products here"
            className=" outline-none             "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid max-w-screen-2xl w-full sm:grid-cols-3 md:grid-cols-4  grid-cols-2	 p-7 gap-3 ">
        {ps?.map((product, key) => (
          <ProductCard {...product} key={key} />
        ))}
      </div>
    </div>
  );
}

export default ProductListComponent;

export function ProductCard({ image_url, product_name, id, price }) {
  return (
    <Link
      className="flex flex-col items-center md:items-start "
      href={"/products/" + id}
    >
      <img
        src={process.env.API_URL + image_url}
        className=" max-h-[154px] max-w-[212px] w-full"
        alt=""
      />
      <div className="p-5 px-0 w-full h-full flex flex-col justify-between gap-2 ">
        <div className=" font-bold w-full "> {product_name}</div>

        <div className="text-[#249C58] font-semibold  ">
          IDR {Number(price).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}

export function ProductDetailAddToCart({ qty, product }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(Number(qty));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addToCart = async () => {
    try {
      const res = await axiosInstance().post("/carts", {
        qty: document.getElementById("addToCart").value,
        productId: product.id,
      });
      setOpen(true);
    } catch (error) {}
  };
  return (
    <div className="flex gap-3">
      <InputComponent
        qty={qty}
        className="max-w-32 h-[49px]"
        min={1}
        max={product?.stock[0].stock_qty}
        id="addToCart"
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <button
        type="button"
        className="h-[49px] border w-[168px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
        onClick={addToCart}
      >
        Buy
      </button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Berhasil menambahkan product ke cart
        </Alert>
      </Snackbar>
    </div>
  );
}
