"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { FcCalendar } from "react-icons/fc";
import MiniCalendar from "@/components/dash_components/calendar/MiniCalendar";
import Car from "./car";
import Customer from "./customer";
import { SidebarContext } from "./Context";
import { getDate } from "@/lib/frontEnd/getDate";
import Validator from "@/lib/frontEnd/zodValidation";
import useSWRMutation from "swr/mutation";
import { toast, Toaster } from "sonner";
import Loading from "@/components/dash_components/loading";

async function sendData(url, { arg }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export default function Page() {
  const initData = {
    car_id: "",
    customer_id: "",
    amount: 0,
    start_date: "",
    end_date: "",
  };
  const initSearch = {
    car: false,
    customer: false,
    start_date: false,
    end_date: false,
    days: 0,
    price: 0,
  };
  const [rev, setRev] = useState(initData);
  const [car, setCar] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [time, setTime] = useState("");
  const [search, setSearch] = useState(initSearch);
  const [valError, setValError] = useState({});

  const { trigger, error, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/reservations`,
    sendData
  );
  const handleAddItem = async () => {
    try {
      const result = await trigger(rev);
      const data = await result.json();
      if (result.ok) {
        toast.success("Success", {
          description: "Reservation Added successfully",
        });
      } else {
        toast.error("Error", { description: `${data.message}` });
      }
    } catch (error) {
      toast.error("Error", { description: `${error.message}` });
    }
  };
  const validatAndSend = (second) => {
    const err = Validator.addReservation(rev);
    if (err?.error !== false) {
      setValError({ ...err });
      return null;
    }
    handleAddItem();
  };
  useEffect(() => {}, [car, search]);
  return (
    <SidebarContext.Provider value={{ rev, setRev, search, setSearch }}>
      <div className="mt-5 flex gap-4">
        {isMutating ? (
          <>
            <Loading />
            <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-50"></div>
          </>
        ) : null}
        <Toaster richColors />
        <div className="flex flex-col w-full gap-2">
          <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-3xl font-bold">Car Info</h2>
              <input
                type="text"
                name="search"
                onChange={(e) => {
                  if (search.car === true) {
                    setSearch({ ...search, car: false });
                    setRev({ ...rev, car_id: "" });
                  }
                  setCar(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch({ ...search, car: true });
                  }
                }}
                placeholder="car plate"
                className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-[300px]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-end  text-[#ef8686]">
                {valError?.car_id}
              </div>
              {search.car ? (
                <Car search={car} />
              ) : (
                <div className="flex justify-center font-bold uppercase text-[#ebebeb] text-xl p-5">
                  <h1>No Car</h1>
                </div>
              )}
            </div>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-3xl font-bold">Customer Info</h2>
              <input
                onChange={(e) => {
                  if (search.customer === true) {
                    setSearch({ ...search, customer: false });
                    setRev({ ...rev, customer_id: "" });
                  }
                  setCustomer(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearch({ ...search, customer: true });
                  }
                }}
                type="text"
                name="search"
                placeholder="license id"
                className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-[300px]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-end  text-[#ef8686]">
                {valError?.customer_id}
              </div>
              {search.customer ? (
                <Customer valError={valError} search={customer} />
              ) : (
                <div className="flex justify-center font-bold uppercase text-[#ebebeb] text-xl p-5">
                  <h1>no Customer</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#fff] w-full rounded-2xl p-5 relative flex flex-col justify-between">
          <h1 className="text-3xl font-bold">Reservation Info</h1>
          {search.start_date || search.end_date ? (
            <div className="mt-4 flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MiniCalendar time={time} />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between mt-5 px-5">
            <button
              onClick={() => {
                if (search.start_date === false && search.end_date === false) {
                  setTime("start_date");
                  setSearch({ ...search, start_date: true });
                }
              }}
              className="flex items-center justify-center gap-2 bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center "
            >
              <FcCalendar className="text-2xl" />
              Start Date
            </button>
            <button
              onClick={() => {
                if (search.start_date === false && search.end_date === false) {
                  setTime("end_date");
                  setSearch({ ...search, end_date: true });
                }
              }}
              className="flex items-center justify-center gap-2 bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center "
            >
              <FcCalendar className="text-2xl" />
              End Date
            </button>
          </div>
          <div className="flex justify-between gap-2 mt-5 px-5">
            <h1 className="text-xl font-bold">From</h1>
            <h1 className="text-xl font-bold">
              {rev.start_date.length > 0 ? getDate(rev.start_date) : null}
            </h1>
            <div className=" text-[#ef8686]">{valError?.start_date}</div>
            <h1 className="text-xl font-bold">To</h1>
            <h1 className="text-xl font-bold">
              {rev.end_date.length > 0 ? getDate(rev.end_date) : null}
            </h1>
            <div className=" text-[#ef8686]">{valError?.end_date}</div>
          </div>
          <div className="mt-5">
            <h1 className="text-xl font-bold">Rent Days : {search.days}</h1>
            <h1 className="text-xl font-bold">
              Total Amount : {search.price === 0 ? 0 : rev.amount}
            </h1>
            <div className="text-[#ef8686]">{valError?.amount}</div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                validatAndSend();
              }}
              className=" bg-[#000000] text-[#fff] p-2 rounded-full w-[200px] text-center"
            >
              Submite Reservation
            </button>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
