import Image from "next/image";
import React from "react";

export default async function Page({ params }) {
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/reservations/${params.id}`
  );
  const result = await data.json();
  console.log(result);
  return (
    <div className="flex p-5 mt-5">
      <div className="w-full p-5 flex flex-col justify-between gap-4">
        <div className="bg-[#fff] flex justify-between gap-2 p-4 rounded-2xl">
          <Image src={"/car.png"} width={500} height={500} alt="rev_car" />
          <div>
            <h1>car name</h1>
            <h1>brand</h1>
            <h1>gear box</h1>
            <h1>fuels</h1>
          </div>
        </div>
        <div className="bg-[#fff] flex gap-2 p-4 rounded-2xl">
          <Image
            src={"/avatar.png"}
            width={80}
            height={80}
            alt="avatar"
            className="rounded-full"
          />
          <div>
            <h1>cutomer name</h1>
            <h1>driver id</h1>
            <h1>phone number</h1>
          </div>
        </div>
      </div>
      <div className=" p-5 flex flex-col justify-between items-center gap-4">
        <div className="bg-[#fff] flex flex-col justify-center items-center p-4 rounded-2xl">
          <div>
            <h1 className="bg-[#000] text-[#fff] p-2 rounded-full w-40 text-center">
              12/02/2024
            </h1>
          </div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>6 Days</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>|</div>
          <div>
            <h1 className="bg-[#000] text-[#fff] p-2 rounded-full w-40 text-center">
              20/02/2024
            </h1>
          </div>
        </div>
        <div className="bg-[#fff] p-5 rounded-2xl flex flex-col gap-3">
          <h1>Total Amount</h1>
          <h1>Rented Days</h1>
          <h1>1400 DH</h1>
          <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
