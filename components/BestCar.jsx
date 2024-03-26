import Image from "next/image";
import React from "react";

export default function BestCar(data) {
  const singalData = data.data;
  let randomIndex = Math.floor(Math.random() * singalData.length);
  const singal = singalData[randomIndex];
  if (!singal) {
    return <div></div>;
  }
  return (
    <div className="bg-[#fff] mt-5 rounded-xl flex gap-3 justify-between lg:flex-row flex-col items-center p-5">
      <div className="flex flex-col justify-between gap-4 items-start p-5">
        <h1 className="text-[50px] font-bold uppercase">{singal.model}</h1>
        <h1 className="text-[20px] text-[#a2a2a2] uppercase font-bold">
          {singal.brand}
        </h1>
        <h1 className="text-[20px] text-[#a2a2a2] uppercase font-bold">
          {singal.matricule}
        </h1>
        <h1 className="text-[20px] text-[#a2a2a2] uppercase font-bold">
          Passanger Capacity : {singal.passenger_capacity}
        </h1>
        <h1 className="text-[20px] text-[#a2a2a2] uppercase font-bold">
          Gear Box : {singal.gear_box}
        </h1>
        <button className="bg-[#000000] hover:bg-[#454545] w-40 text-white rounded-full p-2">
          Book Now
        </button>
      </div>
      <div>
        <Image
          className="object-cover"
          src={`${process.env.NEXT_IMAGE_URL}/${singal?.image}`}
          width={700}
          height={800}
          alt="bestcar"
        />
      </div>
    </div>
  );
}
