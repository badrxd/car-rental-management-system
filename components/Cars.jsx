import React from "react";
import Carcard from "@/components/Carcard";

export default function Cars() {
  return (
    <>
      <div className="grid gap-4 grid-cols-3 grid-rows-2 pt-10">
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
        <Carcard />
      </div>
    </>
  );
}
