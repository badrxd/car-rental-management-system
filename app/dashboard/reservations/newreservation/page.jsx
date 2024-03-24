"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { GoBlocked } from "react-icons/go";
import { FcCalendar } from "react-icons/fc";
import MiniCalendar from "@/components/dash_components/calendar/MiniCalendar";
import useSWRMutation from "swr/mutation";

// async function updateUser(url, { matricule = "33232-h-56" }) {
//   await fetch(`${url}`, {
//     method: "GET",
//   })
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       return err;
//     });
// }
// const fetcher = (...args) => fetch(...args).then((res) => res);

export default function Page() {
  const fetcher = () => fetch(...args).then((res) => res);

  const [change, setChange] = useState(false);
  const [car, setCar] = useState();
  const [search, setSearch] = useState(``);
  const btnclick = () => {
    setChange(true);
  };
  const matricule = 0;
  const { trigger, isMutating } = useSWRMutation(
    // `${process.env.NEXT_PUBLIC_URL}/api/privet/cars`,
    `${process.env.NEXT_PUBLIC_URL}/${search}`,
    fetcher
  );
  if (isMutating) {
    return <>loading</>;
  }
  const first = async () => {
    try {
      const b = await trigger();
      if (b?.ok) {
        const data = await b.json();
        console.log(data);
      } else {
        const data = await b.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div className="mt-5 flex gap-4">
      <div className="flex flex-col w-full gap-2">
        <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-3xl font-bold">Car Info</h2>
            <input
              type="text"
              name="search"
              onChange={(e) => {
                setCar(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(`api/privet/cars?matricule=${car}`);
                  first();
                }
              }}
              placeholder="car plate"
              className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-[300px]"
            />
          </div>
          <div className="flex flex-col gap-3">
            {trigger ? (
              <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md">
                <div className="flex gap-2">
                  <div className="bg-[#fff] rounded-md w-[50px] h-[50px] flex justify-center items-center">
                    <Image
                      src={"/car.png"}
                      width={50}
                      height={50}
                      alt="car-avatar"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">Dacia Sandiro</span>
                    <span className="text-[14px]">5342-B-61</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">350 DH</span>
                  <span className="text-[14px]">PER DAY</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md">
                No Data
              </div>
            )}
            <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md items-center hidden">
              <h1 className="text-[#ff7675]">Car Not Found</h1>
              <Link
                className="bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center"
                href={"/dashboard/cars/newcar"}
              >
                Add New Car
              </Link>
            </div>
          </div>
        </div>
        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-3xl font-bold">Customer Info</h2>
            <input
              type="text"
              name="search"
              placeholder="license id"
              className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-[300px]"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md">
              <div className="flex gap-2">
                <div className="bg-[#fff] rounded-full w-[50px] h-[50px] flex justify-center items-center">
                  <IoPerson className="text-3xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">Soukaina ALX</span>
                  <span className="text-[14px]">IA43526</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {/* <GoBlocked className="text-3xl text-[#f35945]" /> */}
                <GrStatusGood className="text-3xl text-[#00b894]" />
              </div>
            </div>
            <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md items-center hidden">
              <h1 className="text-[#ff7675]">Customer Not Found</h1>
              <Link
                className="bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center"
                href={"/dashboard/customers/newcustomer"}
              >
                Add Customer
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] w-full rounded-2xl p-5 relative flex flex-col justify-between">
        <h1 className="text-3xl font-bold">Reservation Info</h1>
        {change ? (
          <div className="mt-4 flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MiniCalendar />
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between mt-5 px-5">
          <button
            onClick={btnclick}
            className="flex items-center justify-center gap-2 bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center "
          >
            <FcCalendar className="text-2xl" />
            Start Date
          </button>
          <button
            onClick={btnclick}
            className="flex items-center justify-center gap-2 bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center "
          >
            <FcCalendar className="text-2xl" />
            End Date
          </button>
        </div>
        <div className="flex justify-between gap-2 mt-5 px-5">
          <h1 className="text-xl font-bold">From</h1>
          <h1>12/01/2024</h1>
          <h1 className="text-xl font-bold">To</h1>
          <h1>14/01/2024</h1>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-bold">Rent Days : 4</h1>
          <h1 className="text-xl font-bold">Total Amount : 850 DH</h1>
        </div>
        <div className="flex justify-center">
          <button className=" bg-[#000000] text-[#fff] p-2 rounded-full w-[200px] text-center">
            Submite Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
