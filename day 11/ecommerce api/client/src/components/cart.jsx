/** @format */

function CartComponent({ qty, product }) {
  return (
    <div className="p-3 ">
      <div className="flex w-full ">
        <img
          src={process.env.API_URL + product.image_url}
          alt=""
          className=" w-24 h-auto  md:w-48 md:h-[136px] object-cover"
        />
        <div className="text-left md:flex  md:py-4  w-full">
          <div className="w-full sm:text-left text-center">
            {product?.product_name}
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="w-full md:text-lg text-center  font-bold sm:text-right">
              IDR {Number(product?.price * qty).toLocaleString("id-ID")}
            </div>

            <div className="flex sm:justify-end justify-center gap-2">
              <button>
                <svg
                  class="nest-icon "
                  width="24"
                  height="24"
                  fill="rgb(var(--NN500,141,150,170))"
                  viewBox="0 0 24 24"
                  data-testid="cartBtnDelete"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 5.25h-5.24a.7.7 0 0 0 .05-.25 2.76 2.76 0 0 0-5.52 0 .7.7 0 0 0 .05.25H4a.75.75 0 0 0 0 1.5h1.25V20A1.76 1.76 0 0 0 7 21.75h10A1.76 1.76 0 0 0 18.75 20V6.75H20a.75.75 0 1 0 0-1.5ZM10.79 5a1.26 1.26 0 1 1 2.52 0 .996.996 0 0 0 0 .25h-2.57a.7.7 0 0 0 .05-.25Zm6.46 15a.25.25 0 0 1-.25.25H7a.25.25 0 0 1-.25-.25V6.75h10.5V20ZM10 17.74a.75.75 0 0 0 .75-.75V10.1a.75.75 0 1 0-1.5 0V17a.74.74 0 0 0 .75.74Zm4.349-.054a.74.74 0 0 1-.289.054.75.75 0 0 1-.75-.74v-6.9a.75.75 0 1 1 1.5 0v6.89a.741.741 0 0 1-.461.696Z"
                  ></path>
                </svg>
              </button>
              <div className="flex  border-2 p-2 w-28 h-10 rounded-xl text-center">
                <button>
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
                />
                <button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartComponent;
