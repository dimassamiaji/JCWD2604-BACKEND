/** @format */
"use client";
import { userLogin } from "@/redux/middlewares/auth";
import { functionLogin } from "@/redux/slices/userSlice";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "react-redux";
function LoginComponent() {
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    async onSubmit(values) {
      dispatch(userLogin(values));
    },
  });

  return (
    <Flex className=" max-w-96 w-full flex-col gap-2 ">
      <Heading> Login</Heading>

      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input type="email" id="email" onChange={formik.handleChange} />
        <FormHelperText></FormHelperText>

        <FormLabel>Password </FormLabel>
        <Input type="password" id="password" onChange={formik.handleChange} />
        <FormHelperText></FormHelperText>
      </FormControl>

      <Link href={"/auth/register"}>Don't have account? Register</Link>

      <Button colorScheme={"facebook"} onClick={formik.handleSubmit}>
        Login
      </Button>
    </Flex>
  );
}
export default LoginComponent;
