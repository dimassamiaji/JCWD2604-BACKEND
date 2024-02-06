/** @format */
"use client";
import { useParams } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NavbarComponent from "@/components/navbar";
import { axiosInstance } from "@/axios/axios";

function Page() {
  const { productId } = useParams();
  const initalProduct = {
    productName: "",
    price: 0,
    productDescription: "",
    img: "",
    id: 0,
  };
  const [product, setProduct] = useState({ ...initalProduct });
  const userSelector = useSelector((state) => state.auth);
  const buy = (e) => {
    if (
      window.confirm(
        "apakah anda yakin membeli produk " + product.productName + "?"
      )
    ) {
      e.preventDefault();

      const qty = document.getElementById("qty").value;
      const newOrder = {
        productId: product.id,
        userId: userSelector.id,
        qty,
        orderDate: new Date(),
        totalPrice: qty * product.price,
      };
      axiosInstance()
        .post("/orders", newOrder)
        .then(() => {
          alert("order berhasil dibuat");
          document.getElementById("form").reset();
        })
        .catch((err) => console.log(err));

      axiosInstance().get("/products", {
        params: {
          productName: product.productName,
          price: product.price,
        },
      });
    }
  };

  const fetchProduct = () => {
    axiosInstance()
      .get("/products/" + productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err.message));
  };
  const thisRef = useRef(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
          <div className="m-auto">
            <img src={product.img} alt="" />
          </div>
          <div className=" pt-10 flex flex-col gap-5  w-9/12">
            <div className=" font-bold text-3xl" ref={thisRef}>
              {product.productName}
            </div>
            <div className="my-2">
              <div>start from</div>
              <div className="font-bold text-3xl">
                IDR {product?.price?.toLocaleString()}
              </div>
            </div>

            <form action="" onSubmit={buy} className="flex gap-3" id="form">
              <input
                className="h-[49px] border max-w-32 p-5 rounded-lg text-center"
                type="number"
                min={1}
                placeholder="Quantity"
                required
                id="qty"
              ></input>
              <button
                type="submit"
                className="h-[49px] border w-[168px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
              >
                Buy
              </button>
            </form>
            <div className="font-semibold">
              Please Make Sure The Size Fits You
            </div>
            <hr />
            <div className="font-semibold">Authentic. Guarateed.</div>

            <div className=" text-justify">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              earum architecto nisi tempore, consectetur autem porro
              exercitationem soluta, corrupti dicta corporis similique
              repellendus quibusdam. */}
              {product.productDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
