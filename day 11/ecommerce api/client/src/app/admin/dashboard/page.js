/** @format */
"use client";
import { useEffect, useRef, useState } from "react";

import { NavbarAdminComponent } from "@/components/navbar";

import Search from "@/assets/search.png";
import { useFormik } from "formik";
import { axiosInstance } from "@/axios/axios";

/** @format */
function Page() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const initalProduct = {
    productName: "",
    price: 0,
    productDescription: "",
    img: "",
    id: 0,
  };

  const formik = useFormik({
    initialValues: initalProduct,
    onSubmit: () => {
      save();
    },
  });

  const edit2 = (product) => {
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("productName", product.productName);
    formik.setFieldValue("img", product.img);
    formik.setFieldValue("price", product.price);
    formik.setFieldValue("productDescription", product.productDescription);
  };

  const edit = async (id) => {
    const res = await axiosInstance().get("/products/" + id);
    const product = res.data;
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("productName", product.productName);
    formik.setFieldValue("img", product.img);
    formik.setFieldValue("price", product.price);
    formik.setFieldValue("productDescription", product.productDescription);
  };

  const save = () => {
    console.log(formik.values);
    if (formik.values.id) {
      axiosInstance()
        .patch("/products/" + formik.values.id, formik.values)
        .then(() => {
          alert("data berhasil diedit");
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance();
      const newProduct = { ...formik.values };
      delete newProduct.id;
      axiosInstance()
        .post("/products/", newProduct)
        .then(() => {
          alert("data berhasil ditambahkan");
          fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    formik.resetForm();
  };

  const hapus = (id) => {
    if (window.confirm("apakah anda yakin menghapus product id " + id + "?"))
      axiosInstance()
        .delete("/products/" + id)
        .then(() => {
          alert(`id ${id} berhasil dihapus`);
          fetchProducts();
        })
        .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    axiosInstance()
      .get("/products/", {
        params: {
          productName_like: search,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProducts();
  }, [search]);

  const upload = useRef(null);
  return (
    <>
      <NavbarAdminComponent />
      <div className="w-full">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="py-5 w-full">
            <div className="flex px-3 items-center gap-3  border-gray-300 border-b w-72  p-2">
              <img src={Search} alt="" className=" w-3 h-3" />
              <input
                type="text"
                placeholder="Type any products here"
                className=" outline-none             "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full">
            <tr className=" text-center ">
              <th>IMAGE</th>

              <th>PRODUCT NAME</th>
              <th>PRICE</th>
            </tr>
            {products.map((product, key) => (
              <AdminProductCard
                {...product}
                key={key}
                edit={() => edit(product.id)}
                hapus={() => hapus(product.id)}
              />
            ))}
          </table>
          <div className="mt-16 w-full py-3">
            <form id="form" action="" onSubmit={formik.handleSubmit}>
              <h1 className="font-bold text-2xl mb-3">Add Product</h1>
              <div className="flex flex-col gap-1 ">
                <table>
                  <tr>
                    <td> Product Name</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="border p-1  w-96 "
                        required
                        id="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td> Product Image</td>
                    <td>
                      <input
                        type="file"
                        placeholder="Image URL"
                        className="border p-1  w-96 hidden"
                        required
                        id="img"
                        // value={formik.values.img}
                        // onChange={formik.handleChange}
                        ref={upload}
                      />
                      <button
                        className="bg-full bg-green-500  w-32 text-white rounded-md "
                        type="button"
                        onClick={() => {
                          upload.current.click();
                        }}
                      >
                        upload
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td> Product Price</td>
                    <td>
                      <input
                        type="number"
                        placeholder="Product Price"
                        className="border p-1 w-96"
                        min={50000}
                        required
                        id="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td> Product Description</td>
                    <td>
                      <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-1 w-96"
                        required
                        value={formik.values.productDescription}
                        id="productDescription"
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                </table>
                <tr className="flex gap-2">
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    type="submit"
                  >
                    submit
                  </button>
                  <button
                    className="bg-black text-white p-1 px-2 rounded-md w-24 "
                    onClick={() => formik.resetForm()}
                  >
                    clear
                  </button>
                </tr>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
