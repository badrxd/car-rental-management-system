"use client";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "@/components/dash_components/loading";
import useSWR from "swr";
import { toast, Toaster } from "sonner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ params }) {
  const [ok, setOk] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/reservations/${params.id}`,
    fetcher
  );
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>error fetching data</div>;
  }

  const { Car, Customer, Date_range, amount, status } = data.reservation;
  const date1 = new Date(Date_range.start_date);
  const date2 = new Date(Date_range.end_date);
  const differenceInMilliseconds = Math.abs(date2 - date1);
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  const rentedddays = Math.round(differenceInDays);

  const handelCancel = async () => {
    const arg = {
      status: "CANCELLED",
    };
    try {
      setOk(true);
      const cancelfetch = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/privet/reservations/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(arg),
        }
      );
      if (cancelfetch.ok) {
        toast.success("Success", {
          description: "Reservation Cancelled successfully",
        });
        mutate();
      }
    } catch (e) {
      toast.error("Error", {
        description: "Can't Cancel !! try again",
      });
    } finally {
      setOk(false);
    }
  };
  return (
    <div className="flex p-5 mt-5">
      {ok === true ? (
        <>
          <Loading />
          <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-40"></div>
        </>
      ) : null}
      <Toaster richColors />
      <div className="w-full p-5 flex flex-col justify-between">
        <div className="bg-[#fff] flex justify-between items-center gap-2 p-4 rounded-2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${Car?.image}`}
            width={500}
            height={303}
            alt="rev_car"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[30px] font-bold uppercase">{Car.model}</h1>
            <h1 className="text-xl">
              Brand: <span className="uppercase">{Car.brand}</span>
            </h1>
            <h1 className="text-xl">Matricule: {Car.matricule}</h1>
            <h1 className="text-xl">Gear Box: {Car.gear_box}</h1>
            <h1 className="text-xl">Fuels: {Car.fuels}</h1>
          </div>
          <div className="flex flex-col justify-start items-start h-full">
            {status === "CONFIRMED" ? (
              <h1 className="bg-[#29a745] text-[#fff] p-2 rounded-full w-40 text-center ">
                {status}
              </h1>
            ) : (
              <h1 className="bg-[#DC3545] text-[#fff] p-2 rounded-full w-40 text-center ">
                {status}
              </h1>
            )}
          </div>
        </div>
        <div className="bg-[#fff] flex justify-between gap-6 p-4 rounded-2xl">
          <div className="flex gap-4 items-center">
            <Image
              src={"/avatar.png"}
              width={80}
              height={80}
              alt="avatar"
              className="rounded-full"
            />
            <div>
              <h1 className="text-[20px] font-bold uppercase">
                {Customer.full_name}
              </h1>
              <h1>Driver ID: {Customer.driver_id}</h1>
              <h1>Phone Number: {Customer.phone}</h1>
            </div>
          </div>
          <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-3">
            <h1 className="font-bold">Total Amount</h1>
            <h1>{amount} DH</h1>
            {status === "CONFIRMED" ? (
              <button
                onClick={() => {
                  handelCancel();
                }}
                className="bg-[#000] text-[#fff] p-2 rounded-full w-40"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className=" p-5 flex flex-col justify-between items-center gap-4">
        <div className="bg-[#fff] flex flex-col justify-center items-center p-4 rounded-2xl">
          <div>
            <h1 className="bg-[#000] text-[#fff] p-2 rounded-full w-40 text-center">
              {Date_range.start_date.slice(0, 10)}
            </h1>
          </div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div className="font-bold">{rentedddays} Days</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>
            <h1 className="bg-[#000] text-[#fff] p-2 rounded-full w-40 text-center">
              {Date_range.end_date.slice(0, 10)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
