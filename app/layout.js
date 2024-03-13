import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRMS",
  description: "Car Rent Management System",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en" className="bg-[#ebebeb]">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </SessionWrapper>
  );
}
