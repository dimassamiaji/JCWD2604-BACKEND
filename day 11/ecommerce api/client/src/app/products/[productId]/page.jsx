/** @format */

import NavbarComponent from "@/components/navbar";
import { axiosInstanceSSR } from "@/axios/axios";
import { InputComponent } from "@/components/input";
import { ProductDetailAddToCart } from "@/components/productList";

export const metadata = {
  title: "Kickavenue - Product Detail",
  description: "tempat jualan sepatu",
};

async function Page({ params }) {
  const { productId } = params;

  let qty = 1;

  const product = (await axiosInstanceSSR().get("/products/" + productId)).data
    .result;
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
        <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1  justify-items-center">
          <img
            className=" max-w-[734px]  max-h-[523px] w-full"
            src={process.env.API_URL + product.image_url}
            alt=""
          />
          <div className=" pt-10 flex flex-col gap-5  w-9/12">
            <div className=" font-bold text-3xl">{product.product_name}</div>
            <div className="my-2">
              <div>start from</div>
              <div className="font-bold text-3xl">
                IDR {Number(product?.price).toLocaleString("id-ID")}
              </div>
            </div>

            <ProductDetailAddToCart product={product} qty={qty} />
            <div className="font-semibold">
              Please Make Sure The Size Fits You
            </div>
            <hr />
            <div className="font-semibold">Authentic. Guarateed.</div>

            <div className=" text-justify text-sm">
              {
                // product.description ||
                "We thoroughly check every purchase you make and applies our company's guarantee to the product's legitimacy. The guarantee is valid for 2 days after receiving the product from the delivery service. Should you have any concern about the product you purchase, kindly reach out to our Customer Service and Specialist on Monday - Saturday 10.00 - 21.00 (GMT+7 / WIB).\n"
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
