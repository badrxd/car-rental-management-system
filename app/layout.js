'use client'
import { usePathname} from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <SessionWrapper>
      <html lang="en" className="bg-[#ebebeb]">
        <body className={inter.className}>
          {pathname !== '/dashboard' ? 
            <>
              <Header />
              {children}
              <Footer />
            </>
            : 
            <>
              {children}
            </>
          }
        </body>
      </html>
    </SessionWrapper>
  );
}
