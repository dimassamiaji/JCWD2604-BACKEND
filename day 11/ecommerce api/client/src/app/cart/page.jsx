/** @format */
"use client";

import { axiosInstance } from "@/axios/axios";
import CartComponent from "@/components/cart";
import NavbarComponent from "@/components/navbar";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Page() {
  const [carts, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchCart = () => {
    axiosInstance()
      .get("/carts")
      .then((res) => {
        setCart(res.data.result);
        console.log(res.data.result);
        const sum = res.data.result.reduce(
          (sum, { qty, product }) => sum + qty * product.price,
          0
        );
        setTotal(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      <NavbarComponent />
      <center>
        <div className="max-w-screen-xl w-full mt-8 flex md:flex-row flex-col ">
          <div className="max-w-4xl w-full">
            <div className=" font-bold text-xl p-3 pl-5 text-left">CART</div>
            <div className="w-full flex flex-col  ">
              {carts.map((cart, key) => (
                <CartComponent key={key} {...cart} />
              ))}
            </div>
          </div>
          <div className=" w-full  md:w-96 pt-14   flex  md:justify-center  justify-start  px-3">
            <div className="w-full h-36 max-w-80 p-4 text-left border-2 rounded-xl ">
              <b>Check Out</b>
              <div className="flex justify-between border-b pb-1">
                <b>Total</b>
                <div>{total.toLocaleString("id-ID")}</div>
              </div>
              <div className=" py-3">
                <Button fullWidth variant="contained">
                  Beli
                </Button>
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}
export default Page;
