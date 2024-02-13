/** @format */
"use client";
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
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import { axiosInstance } from "@/axios/axios";
function RegisterComponent() {
  YupPassword(Yup);
  const toast = useToast();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };

  const inputFormik = () => {
    formik.setValues({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
      name: document.getElementById("name").value,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email(),
      name: Yup.string().required().min(4),
      password: Yup.string().min(5).minNumbers(1).required().minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "password does not match"),
    }),
    async onSubmit(values) {
      try {
        const { email, password, name } = values;
        const res = await axiosInstance().post("/users/v2", {
          email,
          password,
          name,
        });
        toast({
          title: "Account created.",
          description: res.data.message,
          status: "success",
          duration: 1000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        toast({
          title: "Error",
          position: "top",

          description: error?.response?.data?.message,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    const { email, password, confirmPassword, name } = formik.values;
    if (email && password && confirmPassword && name) formik.handleSubmit();
  }, [formik.values]);

  return (
    <>
      <Flex className=" max-w-96 w-full flex-col gap-2 ">
        <Heading> Register</Heading>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" id="name" />
          <FormHelperText color={"red"}>{formik.errors.name}</FormHelperText>
          <FormLabel>Email address</FormLabel>
          <Input type="email" id="email" />
          <FormHelperText color={"red"}>{formik.errors.email}</FormHelperText>

          <FormLabel>Password </FormLabel>
          <Input type="password" id="password" />
          <FormHelperText color={"red"}>
            {formik.errors.password}
          </FormHelperText>
          <FormLabel>Confirm Password </FormLabel>
          <Input type="password" id="confirmPassword" />
          <FormHelperText color={"red"}>
            {formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
        <Link href="/auth/login">Have account? Login</Link>
        <Button type="button" colorScheme={"facebook"} onClick={inputFormik}>
          Register
        </Button>
      </Flex>
    </>
  );
}
export default RegisterComponent;
