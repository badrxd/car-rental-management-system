import React from "react";
import Carcard from "@/components/Carcard";

export default function Popularcars({ data }) {
  return (
    <div className="flex justify-between pt-10 gap-4 flex-col lg:flex-row md:flex-row">
      {data.map((item ,key) => {
        return <Carcard item={item} key={key} />;
      })}
    </div>
  );
}
