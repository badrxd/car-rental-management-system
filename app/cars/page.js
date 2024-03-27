import React from "react";
import AllCar from "@/components/AllCar.jsx";
export const revalidate = 10;

async function Allcars() {
  const CarData = await fetch(`${process.env.NEXTAUTH_URL}/api/public/cars`);
  const result = await CarData.json();
  return (
    <div className="max-w-6xl mx-auto">
      <AllCar data={result.allCars} />
    </div>
  );
}

export default Allcars;
