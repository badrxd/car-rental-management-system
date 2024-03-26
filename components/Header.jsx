import React from "react";
import Menuitems from "@/components/Menuitems";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex gap-4 justify-between p-3 max-w-6xl mx-auto items-center">
      <Link className="uppercase" href="/">
        <p className="text-[#000000] text-2xl">
          Car<span className="text-black font-bold">Rent</span>
        </p>
      </Link>
      <nav className="sm:flex gap-4 hidden font-bold">
        <Menuitems title="Home" link="/" />
        <Menuitems title="Rent Now" link="/cars" />
        <Menuitems title="About Us" link="/about" />
        <Menuitems title="Contact" link="/contact" />
      </nav>
      <div>
        <button className="bg-[#000000] text-white rounded-full w-20 hover:bg-[#454545] p-2 hidden sm:block ">
          <a href="/login">Login</a>
        </button>
      </div>
      <span className="cursor-pointer sm:hidden ">
        <MdOutlineMenu className="size-8" />
      </span>
    </div>
  );
}
