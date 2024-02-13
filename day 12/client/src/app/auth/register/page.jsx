/** @format */
import RegisterComponent from "@/components/auth/register";
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
import Link from "next/link";
function Page() {
  return (
    <Center className=" min-h-screen ">
      <RegisterComponent />
    </Center>
  );
}
export default Page;
