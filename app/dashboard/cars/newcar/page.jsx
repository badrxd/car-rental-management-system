"use client";
import React, { cache, useEffect, useState } from "react";
import Image from "next/image";
import { MdFileUpload } from "react-icons/md";
import { useSession } from "next-auth/react";
import Validator from "@/lib/frontEnd/zodValidation";
import useSWRMutation from "swr/mutation";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/components/dash_components/loading";

async function sendData(url, { arg }) {
  return fetch(url, {
    method: "POST",
    body: arg,
  });
}

export default function Page() {
  const router = useRouter();
  // Preview the car image before upload
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const CarData = {
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
  const formData = new FormData();
  const [CarNewData, setCarNewData] = useState(CarData);
  const [zodError, setZodError] = useState(false);

  const { trigger, error, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/cars`,
    sendData
  );

  if (error) {
    return <div>error</div>;
  }

  const handleAddItem = async () => {
    try {
      const result = await trigger(formData);
      const data = await result.json();
      if (result.ok) {
        toast.success("Success", {
          description: "Car Added successfully",
        });
      } else {
        toast.error("Error", { description: `${data.message}` });
      }
    } catch (error) {
      toast.error("Error", { description: `${error.message}` });
    }
  };
  const update = (e) => {
    const { name, value } = e.target;
    setCarNewData((prevData) => ({
      ...prevData,
      [name]: name === "matricule" ? value.toLowerCase() : value,
    }));
  };

  const validation = async () => {
    const err = Validator.addCarValidation(CarNewData);
    console.log(err);
    setZodError(err);
    if (err?.error !== false) {
      return null;
    }
    for (const key in CarNewData) {
      const obj = CarNewData[key];
      formData.append(key, obj);
    }
    return true;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {}, [zodError, CarNewData]);
  return (
    <>
      <div className="mt-5 bg-[#fff] flex justify-between p-5 gap-5 rounded-2xl">
        <div className="w-full flex flex-col justify-center items-center gap-10">
          {isMutating ? (
            <>
              <Loading />
              <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-50"></div>
            </>
          ) : null}
          <Toaster richColors />
          {file ? (
            <Image src={file} width={500} height={500} alt="Car Image" />
          ) : (
            <div className="col-span-5 h-[400px] w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
                <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
                <h4 className="text-xl font-bold text-brand-500 dark:text-white">
                  Uploaded image
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  PNG, JPG files are allowed
                </p>
              </div>
            </div>
          )}
          <div className="font-[sans-serif] max-w-md mx-auto flex items-center">
            <label className="font-bold text-black mb-2 block w-40 ">
              Upload Image
            </label>
            <input
              name="image"
              accept="image/png, image/jpeg"
              type="file"
              onChange={(e) => {
                handleChange(e);
                setCarNewData({ ...CarNewData, image: e.target.files[0] });
              }}
              className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
            />
            {zodError?.image ? (
              <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
                {zodError?.image}
              </p>
            ) : null}
          </div>
        </div>
        <div className="w-full">
          <h1 className="uppercase p-3 text-gray-700 font-bold">Brand</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="brand"
            placeholder="Brand"
          />
          {zodError?.brand ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.brand}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Model</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="model"
            placeholder="Model"
          />
          {zodError?.model ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.model}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Color</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="color"
            placeholder="Color"
          />
          {zodError?.color ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.color}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Fuels</h1>
          <select
            onChange={(e) => {
              update(e);
            }}
            name="fuels"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option value=""></option>
            <option value="GASOLINE">GASOLINE</option>
            <option value="DIESEL">DIESEL</option>
          </select>
          {zodError?.fuels ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.fuels}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Matricule</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="matricule"
            placeholder="Matricule"
          />
          {zodError?.matricule ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.matricule}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Gear Box</h1>
          <select
            onChange={(e) => {
              update(e);
            }}
            name="gear_box"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option value=""></option>
            <option value="MANUAL">MANUAL</option>
            <option value="AUTOMATIC">AUTOMATIC</option>
          </select>
          {zodError?.gear_box ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.gear_box}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">
            Passenger Capacity
          </h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="number"
            name="passenger_capacity"
            placeholder="Passenger Capacity"
          />
          {zodError?.passenger_capacity ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.passenger_capacity}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Rent Price</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            name="rent_price"
            type="number"
            placeholder="Rent Price"
          />
          {zodError?.rent_price ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {zodError?.rent_price}
            </p>
          ) : null}
          <button
            onClick={async () => {
              const b = await validation();
              if (b) {
                await handleAddItem();
              }
            }}
            className="bg-[#000] text-[#fff] p-2 mt-5 rounded-full w-full"
          >
            Add New Car
          </button>
        </div>
      </div>
    </>
  );
}
