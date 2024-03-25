import React from "react";
import Link from "next/link";
import { CiFacebook, CiInstagram, CiYoutube } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
import Menuitems from "@/components/Menuitems";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePhoneAndroid } from "react-icons/md";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto bg-[#000] text-white mt-5 flex  flex-col gap-5 justify-between p-5">
      <div className="flex justify-between">
        <div>
          <div>
            <Link className="uppercase" href="/">
              <p className="text-[#f1c40f] size-8">
                Car<span className="text-white font-bold">Rent</span>
              </p>
            </Link>
          </div>
          <br />
          <div className="flex gap-2 items-center text-2xl">
            <CiFacebook />
            <CiInstagram />
            <CiYoutube />
            <FaXTwitter />
          </div>
        </div>
        <div></div>
        <div className="flex flex-col">
          <span>
            <h1 className="">Location</h1>
          </span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt />
            Rue 1337 NL ALX AFRICA{" "}
          </span>
          <span className="flex items-center gap-2">
            <MdOutlinePhoneAndroid />
            +212 632 323 223
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <FaRegCopyright /> 2024 By Ouydir & Assoul
        </div>
        <div className="flex gap-4">
          <Menuitems title="Rent Now" link="/cars" />
          <Menuitems title="About Us" link="/about" />
          <Menuitems title="Contact US" link="/contact" />
        </div>
      </div>
    </div>
  );
}
