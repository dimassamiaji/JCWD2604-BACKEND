/** @format */

import { axiosInstance } from "@/axios/axios";
import { functionLogin } from "../slices/userSlice";

export const userLogin = ({ email, password }) => {
  return async (dispatch) => {
    //function login
    try {
      console.log("masuk middleware");
      const res = await axiosInstance().post("/users/v1", {
        email,
        password,
      });
      const user = res.data.result;

      if (res.data.result?.id) dispatch(functionLogin(user));

      //res.data.result & res.data.token
    } catch (error) {}
  };
};
