/** @format */

import NavbarComponent from "@/components/navigation/navbar";

function Template({ children }) {
  return (
    <>
      <NavbarComponent />
      {children}
    </>
  );
}
export default Template;
