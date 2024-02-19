/** @format */

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/chakra-provider";
import { StoreProvider } from "@/redux/store";
import AuthProvider from "@/components/auth/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TDL App",
  description: "ini app untuk to do list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
          <AuthProvider>
            <Providers>{children}</Providers>
          </AuthProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
