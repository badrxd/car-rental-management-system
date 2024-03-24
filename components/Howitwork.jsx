import React from "react";

export default function Howitwork() {
  return (
    <div className="bg-[#fff] mt-5 p-5 rounded-xl flex flex-col ">
      <div className="flex flex-col justify-center items-center">
        <div>
          <h1 className="text-[60px] font-bold">How it works</h1>
        </div>
        <div className="flex flex-col justify-center items-center font-bold">
          <p>Folllow these step and easily book you comfortable cars</p>
          <p> Enjoy you trips with Favorite car</p>
        </div>
      </div>
      <div className="flex gap-2 mt-5">
        <div className="bg-red-300 p-4">
          <span>car icon</span>
          <h1>Choose a Car</h1>
          <p>See most Popular cars with discount price</p>
        </div>
        <div className="bg-green-300 p-4">
          <span>Pickup date icone</span>
          <h1>Pickup Date</h1>
          <p>Choose your suitable date and our team will book for you</p>
        </div>
        <div className="bg-blue-300 p-4">
          <span>book icon</span>
          <h1>Book your Car</h1>
          <p>click search and Choose your comfortable car</p>
        </div>
      </div>
    </div>
  );
}
