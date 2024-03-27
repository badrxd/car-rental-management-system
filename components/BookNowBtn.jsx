"use client";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { FiPhoneOutgoing } from "react-icons/fi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

import Image from "next/image";

export default function BookNowBtn({ data }) {
  const [click, setClick] = useState(false);

  const handelclick = () => {
    setClick(true);
  };
  return (
    <div>
      {click ? (
        <div className="bg-[#ebebeb]  w-full h-full  fixed top-0 left-0 transform -translate-x-0 -translate-y-0 z-50 p-10">
          <div className="bg-[#ffffff] max-w-4xl mx-auto mt-20 p-5 rounded-xl">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setClick(false);
                }}
              >
                <GrClose className="text-[30px] font-bold" />
              </button>
            </div>
            <div className="flex justify-between sm:flex-col gap-4 mt-4 pb-10 ">
              <div className="">
                <div className="flex justify-center">
                  <h1 className="text-[34px] font-bold uppercase">
                    {data.model}
                  </h1>
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.image}`}
                  width={500}
                  height={500}
                  alt="bookcar"
                />
              </div>
              <div className="flex flex-col gap-4 items-start bg-[#000] text-[#fff] p-5 rounded-xl">
                <h1 className="text-[40px] font-bold uppercase">Thnak You!</h1>
                <h1 className="text-[25px]">Your Car is Waiting For You</h1>
                <h1>Please Contact Us To finsh Your Booking</h1>
                <div>
                  <div className="flex gap-2 items-center">
                    <FiPhoneOutgoing className="text-[25px]" />
                    <h1 className="text-[25px]">06 34 34 43 43</h1>
                  </div>
                </div>
                <h1>Your Booking ID</h1>
                <div className="flex items-center gap-2">
                  <MdOutlineCollectionsBookmark />
                  <h1># {data.matricule}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => {
          handelclick();
        }}
        className="bg-[#000000] hover:bg-[#454545] text-white rounded-lg p-2"
      >
        Book Now
      </button>
    </div>
  );
}
