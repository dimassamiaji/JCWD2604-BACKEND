/** @format */
"use client";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function NavbarComponent() {
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return <Flex>{user?.name}</Flex>;
}
export default NavbarComponent;
