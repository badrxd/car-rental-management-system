"use client";
import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "./Context";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Car({ search: Search }) {
  let { rev, setRev, search, setSearch } = useContext(SidebarContext);
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/cars?matricule=${Search}`,
    fetcher
  );
  if (isLoading) {
    return <>loading...</>;
  }
  if (error) {
    return <>Error</>;
  }
  return (
    <div>
      {data?.error !== true ? (
        <div>
          {data.allCars.length > 0 ? (
            <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md">
              <div className="flex gap-2">
                <div className="bg-[#fff] rounded-md w-[50px] h-[50px] flex justify-center items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.allCars[0].image}`}
                    width={50}
                    height={50}
                    alt="car-avatar"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {rev?.car_id?.length === 0
                      ? setRev({ ...rev, car_id: data?.allCars[0]?.id })
                      : null}
                    {data.allCars[0].model}
                  </span>
                  <span className="text-[14px]">
                    {data.allCars[0].matricule}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {rev?.car_id?.length === 0
                    ? setSearch({
                        ...search,
                        price: data?.allCars[0]?.rent_price,
                      })
                    : null}
                  {data.allCars[0].rent_price} DH
                </span>
                <span className="text-[14px]">PER DAY</span>
              </div>
            </div>
          ) : (
            <>
              <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md items-center">
                <h1 className="text-[#ff7675]">Car Not Found</h1>
                <Link
                  className="bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center"
                  href={"/dashboard/cars/newcar"}
                >
                  Add New Car
                </Link>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex justify-end text-[#ef8686]">{data.message}</div>
      )}
    </div>
  );
}

export default Car;
