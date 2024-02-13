/** @format */
import LoginComponent from "@/components/auth/login";
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
export const metadata = {
  title: "Login Page TDL",
  description: "ini form login",
};

function Page() {
  return (
    <Center className=" min-h-screen ">
      <LoginComponent />
    </Center>
  );
}
export default Page;
