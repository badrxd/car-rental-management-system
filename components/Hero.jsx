import React from "react";

export default function Hero() {
  return (
    <div className="hero-image text-center h-[600px] flex flex-col justify-between rounded-l-full">
      <div>
        <div className="lg:text-6xl md:text-4xl text-3xl px-20 pt-16 pb-5 font-bold">
          <h1>The Best Platform </h1>
          <h1>for Car Rental</h1>
        </div>
        <div className="px-20">
          <h1>
            We open the door for you to explore the world in comfort and style.
          </h1>
          <h1>Being your trusted travel partner</h1>
        </div>
      </div>
    </div>
  );
}
