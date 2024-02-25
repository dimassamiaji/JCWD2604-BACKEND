/** @format */
"use client";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Input } from "@mui/base";
import { useFormik } from "formik";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  maxWidth: 600,
  width: "100%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  p: 3,
};

export function AddressModal({ open, handleClose, total }) {
  const userSelector = useSelector((state) => state.auth);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const formik = useFormik({
    initialValues: {
      province: 0,
      city: "",
    },
  });

  useEffect(() => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((response) => response.json())
      .then((provinces) => setProvinces(provinces));
  }, []);

  useEffect(() => {
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${
        formik.values.province || 11
      }.json`
    )
      .then((response) => response.json())
      .then((regencies) => setCities(regencies));
  }, [formik.values.province]);

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
                id="province"
                onChange={formik.handleChange}
                value={formik.values.province}
              >
                {provinces.map((province) => (
                  <option value={province.id}> {province.name}</option>
                ))}
              </select>
            </div>
            <div className=" flex flex-col  w-full">
              <label htmlFor=""> City </label>
              <select
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                id="city"
                onChange={formik.handleChange}
                value={formik.values.city}
              >
                {cities.map((city) => (
                  <option value={city.name}> {city.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <div className=" flex flex-col w-full">
              <label htmlFor=""> Address </label>
              <input
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                // value={userSelector.email}
              ></input>
            </div>
            <div className=" flex flex-col  w-full">
              <label htmlFor=""> Postal Code </label>
              <input
                className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                // value={userSelector.gender}
              ></input>
            </div>
          </div>
        </div>

        <b>{total}</b>
      </Box>
    </Modal>
  );
}

export function TransactionForm({ total }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button fullWidth variant="contained" onClick={handleOpen}>
        Beli
      </Button>
      <AddressModal open={open} handleClose={handleClose} total={total} />
    </>
  );
}
