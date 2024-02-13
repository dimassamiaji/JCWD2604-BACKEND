/** @format */
"use client";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function NavbarComponent() {
  const user = useSelector((state) => state.auth);
  return <Flex>{user?.name}</Flex>;
}
export default NavbarComponent;
