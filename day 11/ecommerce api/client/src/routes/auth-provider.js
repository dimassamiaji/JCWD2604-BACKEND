/** @format */
"use client";
import { keepLogin } from "@/redux/middleware/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLogin());
  }, []);
  return children;
}
export default AuthProvider;
