"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Btn({ pages, page }) {
  const router = useRouter();

  const changePage = (direction, page) => {
    console.log(pages, page);
    if (
      (direction === "prev" && page === 0) ||
      (direction === "next" && page > pages)
    ) {
      return null;
    }
    // router.push(`/dashboard/cars?page=${page}`);
    // setInterval(() => {
    //   location.reload();
    // }, 1000);

    window.location.replace(`/dashboard/cars?page=${page}`);
  };
  return (
    <>
      <button
        onClick={() => {
          changePage("prev", Number(page) - 1);
        }}
        className="bg-[#000] text-[#fff] p-2 rounded-md w-20 hover:bg-[#5b5b5b]"
      >
        Prev
      </button>
      <button
        onClick={() => {
          changePage("next", Number(page) + 1);
        }}
        className="bg-[#000] text-[#fff] p-2 rounded-md w-20 hover:bg-[#5b5b5b]"
      >
        Next
      </button>
    </>
  );
}

export default Btn;
