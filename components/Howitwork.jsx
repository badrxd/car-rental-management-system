import React from "react";
import { FaCarRear } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoBookmarks } from "react-icons/io5";

export default function Howitwork() {
  return (
    <div className="bg-[] mt-5 p-5 rounded-xl flex flex-col ">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-[60px] sm:text-4xl font-bold">How it works</h1>
        </div>
        <div className="flex flex-col justify-center items-center font-bold">
          <p>Folllow these step and easily book you comfortable cars</p>
          <p> Enjoy you trips with Favorite car</p>
        </div>
      </div>
      <div className=" grid lg:gap-4 lg:grid-cols-3 gap-[80px] mx-6  mt-[80px] ">
        <div className="bg-[#fff] p-4 flex flex-col justify-center items-center  w-full rounded-xl relative">
          <div className="bg-[#060606] w-[100px] h-[100px] rounded-full flex justify-center items-center absolute top-[-40%] left-1/2 transform -translate-x-1/2 -translate-y-0">
            <FaCarRear className="text-3xl text-[#fff]" />
          </div>
          <div className="mt-[40px] flex flex-col justify-center items-center">
            <h1 className="text-[20px] font-bold">Choose a Car</h1>
            <p className="text-center">
              See most Popular cars with discount price
            </p>
          </div>
        </div>
        <div className="bg-[#fff] p-4 flex flex-col justify-center items-center  w-full rounded-xl relative">
          <div className="bg-[#000] w-[100px] h-[100px] rounded-full flex justify-center items-center absolute top-[-40%] left-1/2 transform -translate-x-1/2 -translate-y-0">
            <MdDateRange className="text-4xl text-[#fff]" />
          </div>
          <div className="mt-[40px] flex flex-col justify-center items-center">
            <h1 className="text-[20px] font-bold">Pickup Date</h1>
            <p className="text-center">
              Choose your suitable date and our team will book for you
            </p>
          </div>
        </div>
        <div className="bg-[#fff] p-4 flex flex-col justify-center items-center w-full rounded-xl relative">
          <div className="bg-[#000] w-[100px] h-[100px] rounded-full flex justify-center items-center absolute top-[-40%] left-1/2 transform -translate-x-1/2 -translate-y-0">
            <IoBookmarks className="text-3xl text-[#fff]" />
          </div>
          <div className="mt-[40px] flex flex-col justify-center items-center">
            <h1 className="text-[20px] font-bold">Book your Car</h1>
            <p className="text-center">
              click search and Choose your comfortable car
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
