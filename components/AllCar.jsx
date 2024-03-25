import React from "react";
import Carcard from "@/components/Carcard";

export default function AllCar({ data }) {
  return (
    <>
      <div className="grid gap-4 grid-cols-3 grid-rows-2 pt-10">
        {data.map((item) => {
          return <Carcard item={item} />;
        })}
      </div>
    </>
  );
}
