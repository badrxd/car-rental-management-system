import React from "react";
import Search from "./search";
import Link from "next/link";
import Btn from "./btn";

export default function Page() {
  return (
    <div className="flex justify-between bg-[#fff] rounded-full mt-5 p-5">
      <Search />
      <div>
        <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
          <Link href={"/dashboard/reservations/newreservation"}>
            New Reservation
          </Link>
        </button>
      </div>
    </div>
  );
}
