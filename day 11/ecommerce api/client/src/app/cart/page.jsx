/** @format */
"use client";

import { axiosInstance } from "@/axios/axios";
import CartComponent from "@/components/cart";
import NavbarComponent from "@/components/navbar";
import { useEffect, useState } from "react";

function Page() {
  const [carts, setCart] = useState([]);
  const fetchCart = () => {
    axiosInstance()
      .get("/carts")
      .then((res) => {
        setCart(res.data.result);
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
        <div className="max-w-screen-xl w-full mt-8 flex  ">
          <div className="max-w-4xl w-full">
            <div className=" font-bold text-xl p-3 pl-5 text-left">CART</div>
            <div className="w-full flex flex-col  ">
              {carts.map((cart) => (
                <CartComponent {...cart} />
              ))}
            </div>
          </div>
          <div className=" max-w-80 w-full m-auto border-2">check out</div>
        </div>
      </center>
    </>
  );
}
export default Page;
