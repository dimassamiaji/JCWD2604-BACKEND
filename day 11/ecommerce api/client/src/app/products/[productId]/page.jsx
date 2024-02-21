/** @format */

import NavbarComponent from "@/components/navbar";
import { axiosInstanceSSR } from "@/axios/axios";

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

            <form action="" className="flex gap-3" id="form">
              {/* <input
                className="h-[49px] border max-w-32 p-5 rounded-lg text-center"
                type="number"
                min={1}
                placeholder="Quantity"
                required
                id="qty"
              ></input> */}
              <div className="flex  border-2 p-2 max-w-32 h-[49px] rounded-xl text-center">
                <button type="button">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5Z"></path>
                    </svg>{" "}
                  </svg>
                </button>
                <input
                  className="w-full text-center outline-none "
                  defaultValue={qty}
                  min={1}
                />
                <button type="button">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 11.25h-7.25V4a.75.75 0 1 0-1.5 0v7.25H4a.75.75 0 1 0 0 1.5h7.25V20a.75.75 0 1 0 1.5 0v-7.25H20a.75.75 0 1 0 0-1.5Z"></path>
                  </svg>
                </button>
              </div>
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

            <div className=" text-justify text-sm">
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              earum architecto nisi tempore, consectetur autem porro
              exercitationem soluta, corrupti dicta corporis similique
              repellendus quibusdam. */}
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
