import Image from "next/image";
import React from "react";
import { GiGasPump } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

export default function Carcard({ item, key }) {
  return (
    <div key={key} className="p-5 bg-[#fafafa] rounded-lg flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold uppercase">{item?.model}</h1>
        </div>
        <div className="">
          <CiHeart className="text-3xl cursor-pointer" />
        </div>
      </div>
      <div className="w-[300px] h-[200px]">
        <Image
          className="object-cover"
          src={`${process.env.NEXT_IMAGE_URL}/${item?.image}`}
          alt={"card-image"}
          width={500}
          height={500}
        />
      </div>
      <div className="flex justify-between">
        <span className="flex justify-between items-center gap-1">
          <GiGasPump className="text-2xl" />
          {item?.fuels}
        </span>
        <span className="flex justify-between items-center gap-1">
          <GiGearStickPattern className="text-2xl" />
          {item?.gear_box}
        </span>
        <span className="flex justify-between items-center gap-1">
          <FaPeopleGroup className="text-2xl" />
          {item?.passenger_capacity}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span>{item?.rent_price} DH/Day</span>
        <button className="bg-[#000000] hover:bg-[#454545] text-white rounded-lg p-2">
          Book Now
        </button>
      </div>
    </div>
  );
}
