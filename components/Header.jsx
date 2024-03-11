import React from "react";
import Menuitems from "@/components/Menuitems";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex gap-4 justify-between p-3 max-w-6xl mx-auto items-center">
      <Link className="uppercase" href="/">
        <p className="text-[#f1c40f] size-8">
          Car<span className="text-black font-bold">Rent</span>
        </p>
      </Link>
      <nav className="sm:flex gap-4 hidden">
        <Menuitems title="Rent Now" link="/cars" />
        <Menuitems title="About Us" link="/about" />
        <Menuitems title="Contact" link="/contact" />
      </nav>
      <div>
        <button className="bg-[#000000] text-white rounded p-2 hidden sm:block ">
          <a href="/login">Login</a>
        </button>
      </div>
      <span className="cursor-pointer sm:hidden ">
        <MdOutlineMenu className="size-8" />
      </span>
    </div>
  );
}
