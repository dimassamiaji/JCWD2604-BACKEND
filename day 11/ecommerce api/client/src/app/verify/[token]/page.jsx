/** @format */
import verify from "../../../assets/verify.gif";
import error from "../../../assets/error.gif";
import Image from "next/image";
import { axiosInstanceSSR } from "@/axios/axios";

async function Page({ params }) {
  await axiosInstanceSSR().patch("/users/verify", {
    headers: {
      Authorization: params.token,
    },
  });
  return (
    <div>
      <center>
        <Image src={verify} alt=""></Image>
        <Image src={error} alt=""></Image>
      </center>
    </div>
  );
}
export default Page;
