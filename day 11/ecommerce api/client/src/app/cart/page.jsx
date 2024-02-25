/** @format */
"use client";

import { axiosInstance } from "@/axios/axios";
import CartComponent from "@/components/cart";
import { TransactionForm } from "@/components/modal/address";
import NavbarComponent from "@/components/navbar";
import { Button } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useDebounce } from "use-debounce";

export const CartContext = createContext(null);
function Page() {
  const [carts, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchCart = () => {
    axiosInstance()
      .get("/carts")
      .then((res) => {
        setCart(res.data.result);
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

  const beli = async (values) => {
    try {
      await axiosInstance().post("/transactions", values);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      <NavbarComponent />
      <CartContext.Provider
        value={{
          carts,
          fetchCart,
          beli,
          total,
        }}
      >
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
              <div className="w-full h-36 md:max-w-82 p-4 text-left border-2 rounded-xl ">
                <b>Check Out</b>
                <div className="flex justify-between border-b pb-1">
                  <div>Total</div>
                  <b>{total.toLocaleString("id-ID")}</b>
                </div>
                <div className=" py-3">
                  <TransactionForm />
                </div>
              </div>
            </div>
          </div>
        </center>
      </CartContext.Provider>
    </>
  );
}
export default Page;
