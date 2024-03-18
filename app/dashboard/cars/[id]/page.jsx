import React from "react";
import { FiSearch } from "react-icons/fi";
import { cookies } from "next/headers";

export default async function page({ params }) {
  const cookieStore = cookies();
  const token =
    process.env.NODE_ENV === "production"
      ? cookieStore.get("__Secure-next-auth.session-token")?.value
      : cookieStore.get("next-auth.session-token")?.value;
  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/cars/${params.id}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await reponse.json();
  if (data.error) {
    return (
      <div className="mt-10">
        <h1 className="text-3xl">Data Not Found</h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between bg-[#fff] rounded-full p-5">
        <div className="flex items-center bg-lightPrimary rounded-full w-96">
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
      <div className="bg-[#fff] mt-10 rounded-3xl ">
        <div className="flex">
          <div className=" w-full p-5">
            <h1 className="uppercase p-3">Brand</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Brand"
            />
            <h1 className="uppercase p-3">Model</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Model"
            />
            <h1 className="uppercase p-3">Color</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Color"
            />
            <h1 className="uppercase p-3">Fuels</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Fuels"
            />
          </div>
          <div className="w-full p-5">
            <h1 className="uppercase p-3">Matricule</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="matricule"
            />
            <h1 className="uppercase p-3">Gear Box</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Gear Box"
            />
            <h1 className="uppercase p-3">Passenger Capacity</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Passenger Capacity"
            />
            <h1 className="uppercase p-3">Rent Price</h1>
            <input
              className="p-2 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Rent Price"
            />
          </div>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex w-fit">
            <div className="font-[sans-serif] max-w-md mx-auto flex items-center">
              <label className="text-sm text-black mb-2 block w-40 ">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
              />
            </div>
          </div>
          <div>
            <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
