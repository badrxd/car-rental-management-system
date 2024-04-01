"use client";
import React, { useState, useEffect } from "react";
import Menuitems from "@/components/Menuitems";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import Dropdown from "@/components/dash_components/dropdown";
import Image from "next/image";

export default function Header() {
  const [change, onChange] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {}, [status]);
  let name = "";
  let email = "";
  let image = "";

  if (status === "authenticated") {
    name = session.user.name;
    email = session.user.email;
    image = session.user.image;
  }
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
        <button className="text-white rounded-full p-2 hidden sm:block ">
          {session ? (
            <Dropdown
              button={
                image ? (
                  <Image
                    src={image}
                    width={100}
                    height={100}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <IoPersonCircleOutline className="h-5 text-3xl w-5 text-gray-600" />
                )
              }
              classNames={"p-5 top-8 -left-[200px] w-max"}
            >
              <div className="flex w-70 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="m-4 mt-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, {name}
                    </p>{" "}
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                <div className="ml-4  p-5 flex flex-col justify-center items-center gap-5">
                  <p className="text-sm text-gray-800 dark:text-white hover:dark:text-white">
                    Email: {email}
                  </p>
                  <a
                    href="/dashboard"
                    className="bg-[#000] text-[#fff] p-2 rounded-full w-40"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-[#000] text-[#fff] p-2 rounded-full w-40"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </Dropdown>
          ) : (
            <a
              className="bg-[#200d0d] text-white rounded-full w-40 hover:bg-[#454545] p-2"
              href="/login"
            >
              Admin
            </a>
          )}
        </button>
      </div>
      <span
        onClick={() => {
          onChange(true);
        }}
        className="cursor-pointer sm:hidden "
      >
        <MdOutlineMenu className="size-8" />
      </span>
      {change ? (
        <div className="fixed top-0 right-0 left-0  bg-[#c0c0c0] w-full z-50 text-[#fff] p-5 ">
          <div className="w-full flex justify-end">
            <IoMdClose
              onClick={() => {
                onChange(false);
              }}
              className="text-[#fff] text-2xl cursor-pointer"
            />
          </div>
          <nav
            onClick={() => {
              onChange(false);
            }}
            className="font-bold flex flex-col  gap-4"
          >
            <Menuitems title="Home" link="/" />
            <Menuitems title="Rent Now" link="/cars" />
            <Menuitems title="About Us" link="/about" />
            <Menuitems title="Contact" link="/contact" />
          </nav>
        </div>
      ) : null}
    </div>
  );
}
