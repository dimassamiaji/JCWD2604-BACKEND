/** @format */
"use client";

import { keepLogin } from "@/redux/middlewares/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const fetchLogin = async () => {
    try {
      dispatch(keepLogin());
    } catch (error) {}
  };

  useEffect(() => {
    fetchLogin();
  }, [children]);

  return <>{children}</>;
}
export default AuthProvider;
