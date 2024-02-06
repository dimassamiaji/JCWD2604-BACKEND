/** @format */

import { axiosInstance } from "@/axios/axios";
import { functionLogin } from "../slices/userSlice";

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance().get("/users", {
        params: { email, password },
      });

      if (res.data.result?.id) {
        const { first_name } = res.data.result;

        alert("welcome " + first_name);
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      } else {
        alert("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      return err.message;
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user");
      console.log(token);
      const res = await axiosInstance().get("/users/keep-login", {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.result?.id) {
        dispatch(functionLogin(res.data.result));

        localStorage.setItem("user", res.data.token);
      } else {
        alert("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("auth");
      return err.message;
    }
  };
};
