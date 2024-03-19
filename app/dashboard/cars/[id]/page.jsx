"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { z } from "zod";

export default function Page({ params }) {
  const UpdateData = {
    // I will add the updated car data here to be sent to the server
    brand: null,
    model: null,
    color: null,
    fuels: null,
    gear_box: null,
    passenger_capacity: null,
    rent_price: null,
    matricule: null,
    image: null,
  };
  // zod validation for input data
  const carSchema = z.object({
    brand: z.string().toLowerCase().min(2).max(20),
    model: z.string().toLowerCase().min(2).max(20),
    image: "",
    color: z.string().toLowerCase().min(2).max(20),
    fuels: "",
    gear_box: "",
    matricule: z
      .string()
      .regex(/^\d+-[A-Za-z]-\d+$/, "Invalid matricule format"),
    passenger_capacity: "",
    rent_price: "",
  });

  const [updateData, setUpdateData] = useState(UpdateData);
  const { data: session, status } = useSession();
  let [change, setChange] = useState(false);
  let [data, setData] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };
  const update = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(updateData);
  useEffect(() => {
    const first = async () => {
      const reponse = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/privet/cars/${params.id}`,
        {
          cache: "no-store",
          headers: { Authorization: `Bearer ${session.accessToken}` },
        }
      );
      const Data = await reponse.json();
      setData(Data);
    };
    if (status === "authenticated") {
      first();
    }
  }, [status]);
  useEffect(() => {}, [change]);
  return (
    <>
      <div className="mt-5 bg-[#fff] flex justify-between p-5 rounded-2xl">
        <div className="w-full flex flex-col justify-start items-center gap-10">
          <Image
            src={`/images/${data?.image}`}
            width={500}
            height={500}
            alt="Car Image"
          />
          {change === true ? (
            <div className="font-[sans-serif] max-w-md mx-auto flex items-center">
              <label className="font-bold text-black mb-2 block w-40 ">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full">
          <h1 className="uppercase p-3 text-gray-700 font-bold">Brand</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Brand"
            disabled={isDisabled}
            placeholder="Brand"
            value={isDisabled ? `${data?.brand}` : updateData.brand}
          />
          <h1 className="uppercase p-3 text-gray-700 font-bold">Model</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Model"
            disabled={isDisabled}
            placeholder="Model"
            value={isDisabled ? `${data?.model}` : updateData.model}
          />
          <h1 className="uppercase p-3 text-gray-700 font-bold">Color</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Color"
            disabled={isDisabled}
            placeholder="Color"
            value={isDisabled ? `${data?.color}` : updateData.color}
          />
          <h1 className="uppercase p-3 text-gray-700 font-bold">Fuels</h1>
          {/* <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Fuels"
            disabled={isDisabled}
            placeholder="Fuels"
            value={isDisabled ? `${data?.fuels}` : updateData.fuels}
          /> */}
          <select
            disabled={isDisabled}
            name="fuels"
            id="fuels"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option
              value={isDisabled ? `${data?.fuels}` : "GASOLINE"}
              className="font-bold"
            >
              {isDisabled ? `${data?.fuels}` : "GASOLINE"}
            </option>
            <option value="DIESEL">DIESEL</option>
          </select>
          <h1 className="uppercase p-3 text-gray-700 font-bold">Matricule</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Matricule"
            disabled={isDisabled}
            placeholder="Matricule"
            value={isDisabled ? `${data?.matricule}` : updateData.matricule}
          />
          <h1 className="uppercase p-3 text-gray-700 font-bold">Gear Box</h1>
          {/* <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Gear Box"
            disabled={isDisabled}
            placeholder="Gear Box"
            value={isDisabled ? `${data?.gear_box}` : updateData.gear_box}
          /> */}
          <select
            disabled={isDisabled}
            name="fuels"
            id="fuels"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option
              value={isDisabled ? `${data?.gear_box}` : "MANUAL"}
              className="font-bold"
            >
              {isDisabled ? `${data?.gear_box}` : "MANUAL"}
            </option>
            <option value="AUTO">AUTO</option>
          </select>
          <h1 className="uppercase p-3 text-gray-700 font-bold">
            Passenger Capacity
          </h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="Passenger Capacity"
            disabled={isDisabled}
            placeholder="Passenger Capacity"
            value={
              isDisabled
                ? `${data?.passenger_capacity}`
                : updateData.passenger_capacity
            }
          />
          <h1 className="uppercase p-3 text-gray-700 font-bold">Rent Price</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            name="rent_price"
            type="number"
            disabled={isDisabled}
            placeholder="Rent Price"
            value={isDisabled ? `${data?.rent_price}` : updateData.rent_price}
          />
          {change === true ? (
            <div className="flex gap-6">
              <button
                onClick={() => {
                  location.reload();
                }}
                className="bg-[#ff2727] text-[#fff] p-2 mt-5 rounded-full w-full"
              >
                Cancle
              </button>
              <button className="bg-[#000] text-[#fff] p-2 mt-5 rounded-full w-full">
                Update
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleClick();
                setChange(true);
              }}
              className="bg-[#000] text-[#fff] p-2 mt-5 rounded-full w-full"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      {/* <div className="bg-[#fff] mt-10 rounded-3xl ">
        <div className="flex">
          <div className=" w-full p-5">
            <h1 className="uppercase p-3">Brand</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Brand"
            />
            <h1 className="uppercase p-3">Model</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Model"
            />
            <h1 className="uppercase p-3">Color</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Color"
            />
            <h1 className="uppercase p-3">Fuels</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Fuels"
            />
          </div>
          <div className="w-full p-5">
            <h1 className="uppercase p-3">Matricule</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              disabled="true"
              placeholder="matricule"
              value={"875564-A-62"}
            />
            <h1 className="uppercase p-3">Gear Box</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Gear Box"
            />
            <h1 className="uppercase p-3">Passenger Capacity</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Passenger Capacity"
            />
            <h1 className="uppercase p-3">Rent Price</h1>
            <input
              className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
              type="text"
              placeholder="Rent Price"
            />
          </div>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex w-fit">
            <div className="font-[sans-serif] max-w-md mx-auto flex items-center">
              <label className="font-bold text-black mb-2 block w-40 ">
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
      </div> */}
    </>
  );
}
