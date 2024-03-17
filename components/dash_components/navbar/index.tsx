"use client";
import React, { useEffect } from "react";
import Dropdown from "@/components/dash_components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import NavLink from "@/components/dash_components/link/NavLink";
import navbarimage from "/public/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import Configurator from './Configurator';
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "/public/img/avatars/avatar4.png";
import Image from "next/image";

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText, mini, hovered } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  useEffect(() => {
    setDarkmode(document.body.classList.contains("dark"));
  }, []);
  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <NavLink
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <NavLink
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </NavLink>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[150px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[150px] md:flex-grow-0 md:gap-1 xl:w-[150px] xl:gap-2">
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              width="2"
              height="20"
              className="h-10 w-10 rounded-full"
              src={avatar}
              alt="Elon Musk"
            />
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        >
          <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋 Hey, Adela
                </p>{" "}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="ml-4 mt-3 flex flex-col">
              <a
                href=" "
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Newsletter Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
              >
                Log Out
              </a>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
