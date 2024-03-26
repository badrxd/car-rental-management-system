import React from "react";
import Carcard from "@/components/Carcard";

export default function AllCar({ data }) {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3 grid-rows-2 md:grid-cols-2 pt-10">
        {data.map((item, key) => {
          return <Carcard item={item} key={key} />;
        })}
      </div>
    </>
  );
}
