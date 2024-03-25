import Image from "next/image";
import React from "react";

export default function BestCar() {
  return (
    <div className="bg-[#fff] mt-5 rounded-xl flex gap-3 justify-between items-center p-5">
      <div className="flex flex-col justify-between gap-4 items-start p-5">
        <h1 className="text-[50px] font-bold">Dacia Sandiro</h1>
        <h1 className="text-[20px] text-[#a2a2a2] font-bold">Dacia</h1>
        <h1 className="text-[20px] text-[#a2a2a2] font-bold">3241-B-61</h1>
        <h1 className="text-[20px] text-[#a2a2a2] font-bold">
          Passanger Capacity : 5
        </h1>
        <h1 className="text-[20px] text-[#a2a2a2] font-bold">
          Gear Box : Auto
        </h1>
        <button className="bg-[#000000] hover:bg-[#454545] w-40 text-white rounded-full p-2">
          Book Now
        </button>
      </div>
      <div>
        <Image src={"/car.png"} width={700} height={800} alt="bestcar" />
      </div>
    </div>
  );
}
