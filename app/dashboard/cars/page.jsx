import React from "react";
import { FiSearch } from "react-icons/fi";
import CarsTable from "@/components/dash_components/CarsTable";
import CarsTableData from "@/components/dash_components/variables/CarsTableData";
import {get_token} from "@/lib/frontEnd/getToken"

import { cookies } from "next/headers";

const Cars = async () => {
  const cookieStore = cookies();
  const token =
    process.env.NODE_ENV === "production"
      ? cookieStore.get("__Secure-next-auth.session-token")?.value
      : cookieStore.get("next-auth.session-token")?.value;
  const reponse = await fetch(`${process.env.NEXTAUTH_URL}/api/privet/cars`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await reponse.json();
  if (data.error) {
    return (
      <div className="mt-10">
        <h1 className="text-3xl">Data Not Found</h1>
      </div>
    );
  }
  return (
    <div className="pt-5">
      <div className="flex justify-between bg-[#fff] rounded-full p-5">
        <div className="flex items-center bg-lightPrimary  dark:bg-navy-900 rounded-full w-96">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-full"
          />
        </div>
        <div>
          <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
            Add New Car
          </button>
        </div>
      </div>
      <div className="pt-5">
        <CarsTable tableData={CarsTableData(data)} />
      </div>
    </div>
  );
};

export default Cars;
