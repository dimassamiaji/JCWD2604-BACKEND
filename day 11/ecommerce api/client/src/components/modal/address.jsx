/** @format */
"use client";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { createContext, useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { CartContext } from "@/app/cart/page";
import { axiosInstance } from "@/axios/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "100%",
  bgcolor: "background.paper",
  p: 3,
};

export function AddressModal({ open, handleClose }) {
  const userSelector = useSelector((state) => state.auth);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const { total, beli } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      provinceId: 0,
      cityId: 0,
      address: "",
      postal_code: 0,
    },
  });
  const fetchProvince = async () => {
    try {
      const { data } = await axiosInstance().get("/addresses/province");
      setProvinces(data.result);
      fetchCity(data.result[0].id);
    } catch (error) {}
  };
  const fetchCity = async (id) => {
    try {
      const { data } = await axiosInstance().get("/addresses/city/" + id);
      setCities(data.result);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProvince();
  }, [open]);

  useEffect(() => {
    if (formik.values.provinceId) fetchCity(formik.values.provinceId);
  }, [formik.values.provinceId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between border-b pb-2">
            <b>Payment Detail</b>
            <div>
              <CloseIcon onClick={handleClose} />
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <div className=" flex flex-col w-full">
              <label htmlFor=""> First Name </label>
              <input
                className=" p-2  border-[#F3F4F6] rounded-lg w-full"
                disabled
                value={userSelector.first_name}
              ></input>
            </div>
            <div className=" flex flex-col  w-full">
              <label htmlFor=""> Last Name </label>
              <input
                className=" p-2 border-[#F3F4F6] rounded-lg "
                disabled
                value={userSelector.last_name}
              ></input>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <div className=" flex flex-col w-full">
              <label htmlFor=""> Email </label>
              <input
                className=" p-2  border-[#F3F4F6] rounded-lg w-full"
                disabled
                value={userSelector.email}
              ></input>
            </div>
            <div className=" flex flex-col  w-full">
              <label htmlFor=""> Gender </label>
              <input
                className=" p-2 border-[#F3F4F6] rounded-lg "
                disabled
                value={userSelector.gender}
              ></input>
            </div>
          </div>

          <div className="flex justify-between border-b py-2 ">
            <b>Billing Address</b>
          </div>

          <div className="flex justify-between gap-4 mt-4">
            <div className=" flex flex-col w-full">
              <label htmlFor=""> Province </label>
              <select
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                id="provinceId"
                onChange={formik.handleChange}
                value={formik.values.province}
              >
                {provinces?.map((province) => (
                  <option value={province.id}> {province.name}</option>
                ))}
              </select>
            </div>
            <div className=" flex flex-col  w-full">
              <label htmlFor=""> City </label>
              <select
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                id="cityId"
                onChange={formik.handleChange}
                value={formik.values.city}
              >
                {cities.map((city) => (
                  <option value={city.id}> {city.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <div className=" flex flex-col w-full">
              <label htmlFor=""> Address </label>
              <textarea
                id="address"
                onChange={formik.handleChange}
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full h-16 resize-none"
              ></textarea>
            </div>
            <div className=" flex flex-col  w-3/4">
              <label htmlFor=""> Postal Code </label>
              <input
                id="postal_code"
                onChange={formik.handleChange}
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
              ></input>
            </div>
          </div>

          <div className="flex justify-between border-b py-2 mt-4">
            <b>BCA VIRTUAL ACCOUNT</b>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className=" flex flex-col w-full">
              <div>Nomor Virtual Account</div>
              <b className="text-sm">80777087123458</b>
            </div>
            <div className=" flex flex-col w-full">
              <div>Total Pembayaran</div>
              <b className="text-sm">Rp{total.toLocaleString("id-ID")}</b>
            </div>

            <Button
              type="button"
              variant="contained"
              onClick={() => {
                beli(formik.values);
              }}
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export function TransactionForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button fullWidth variant="contained" onClick={handleOpen}>
        Beli
      </Button>
      <AddressModal open={open} handleClose={handleClose} />
    </>
  );
}
