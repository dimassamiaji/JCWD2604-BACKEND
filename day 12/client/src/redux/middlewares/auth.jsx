/** @format */

import { axiosInstance } from "@/axios/axios";
import { functionLogin, functionLogout } from "../slices/userSlice";

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    //function login
    try {
      console.log("masuk middleware");
      const res = await axiosInstance().post("/users/v1", {
        email,
        password,
      });
      console.log(res);
      const user = res.data?.result;
      user.token = res.data?.token;
      if (res.data.result?.id) dispatch(functionLogin(user));

      //res.data.result & res.data.token
    } catch (error) {}
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      console.log("hello");
      const res = await axiosInstance().get("/users/v3");
      const user = res.data.result;
      user.token = res.data?.token;

      if (res.data.result?.id) dispatch(functionLogin(user));
    } catch (error) {
      dispatch(functionLogout());
    }
  };
};
