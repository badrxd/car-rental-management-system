"use client";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ params }) {
  // const data = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/privet/reservations/${params.id}`
  // );
  // const result = await data.json();
  // console.log(result);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/reservations/${params.id}`,
    fetcher
  );
  if (isLoading) {
    return <div>Loading</div>;
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

  return (
    <div className="flex p-5 mt-5">
      <div className="w-full p-5 flex flex-col justify-between">
        <div className="bg-[#fff] flex gap-2 p-4 rounded-2xl">
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
              <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
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
