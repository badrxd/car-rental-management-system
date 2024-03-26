import Image from "next/image";
import React from "react";
import { GiGasPump } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import BookNowBtn from "@/components/BookNowBtn";

export default function Carcard({ item }) {
  return (
    <div className="p-5 bg-[#fafafa] rounded-lg flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold uppercase">{item?.model}</h1>
          <h1 className="uppercase">{item?.brand}</h1>
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
        <BookNowBtn data={item} />
      </div>
    </div>
  );
}
