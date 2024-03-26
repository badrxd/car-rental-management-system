"use client";
import useSWR from "swr";
import { createContext, useContext, useState } from "react";
import { SidebarContext } from "./Context";
import { GrStatusGood } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { GoBlocked } from "react-icons/go";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Reservation({ search }) {
  return <div>Reservation</div>;
}

export default Reservation;
