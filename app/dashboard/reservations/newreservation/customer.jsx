"use client";
import useSWR from "swr";
import { createContext, useContext, useState } from "react";
import { SidebarContext } from "./Context";
import { GrStatusGood } from "react-icons/gr";
import { IoPerson } from "react-icons/io5";
import { GoBlocked } from "react-icons/go";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Customer({ valError, search }) {
  let { rev, setRev } = useContext(SidebarContext);
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/customers?driver_id=${search}`,
    fetcher
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  if (error) {
    return <>Error</>;
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      {data?.error !== true ? (
        <>
          {data.allCustomers.length > 0 ? (
            <>
              <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md">
                <div className="flex gap-2">
                  <div className="bg-[#fff] rounded-full w-[50px] h-[50px] flex justify-center items-center">
                    <IoPerson className="text-3xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">
                      {rev?.customer_id?.length === 0
                        ? setRev({
                            ...rev,
                            customer_id: data?.allCustomers[0]?.id,
                          })
                        : null}
                      {data.allCustomers[0].full_name}
                    </span>
                    <span className="text-[14px]">
                      {data.allCustomers[0].driver_id}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  {data.allCustomers[0].balcklist ? (
                    <GoBlocked className="text-3xl text-[#f35945]" />
                  ) : (
                    <GrStatusGood className="text-3xl text-[#00b894]" />
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className=" bg-[#F4F7FE] flex gap-2 justify-between p-3 rounded-md items-center">
              <h1 className="text-[#ff7675]">Customer Not Found</h1>
              <Link
                className="bg-[#000000] text-[#fff] p-2 rounded-full w-40 text-center"
                href={"/dashboard/customers/newcustomer"}
              >
                Add Customer
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-end text-[#ef8686]">{data.message}</div>
      )}
    </div>
  );
}

export default Customer;
