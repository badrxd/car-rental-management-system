"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Validator from "@/lib/frontEnd/zodValidation";
import useSWR, { mutate } from "swr";
import { toast, Toaster } from "sonner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ params }) {
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
  const UpdateData = {
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
  const [updateData, setUpdateData] = useState(UpdateData);
  const { data: session, status } = useSession();
  const [error, setEroor] = useState(false);
  let [data, setData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    data: updatedataA,
    error: updateError,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/cars/${params.id}`,
    fetcher
  );
  if (updateError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>loading jawad</div>;
  }
  const handleAddItem = async () => {
    try {
      setData(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/privet/cars/${params.id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response.ok) {
        const newData = await response.json();
        const updatedData = [newData?.b];
        if (response.status !== 200) {
        } else {
          mutate(
            `${process.env.NEXT_PUBLIC_URL}/api/privet/cars/${params.id}`,
            updatedData[0],
            false
          );
        }
        setIsDisabled(true);
        toast.success("Success", {
          description: "Car Info Updated successfully",
        });
      } else {
        const newData = await response.json();
        toast.error("Error", { description: `${newData.message}` });
        console.error("Failed to add item:");
      }
    } catch (error) {
      console.log("Error");
      console.log(error);
      console.error("Error adding item:", error);
    } finally {
      setData(false);
    }
  };

  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };
  const update = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value.toLowerCase(),
    }));
  };

  const validation = () => {
    const err = Validator.cardatavalidation(updateData, setEroor);
    setEroor(err);
    if (err?.error !== false) {
      return null;
    }
    let c = 0;
    for (const key in updateData) {
      const obj = updateData[key];
      if (obj !== null && obj !== "") {
        c += 1;
        formData.append(key, obj);
      }
    }
    if (c === 0) {
      return null;
    }
    handleAddItem();
  };
  return (
    <>
      <div className="mt-5 bg-[#fff] flex justify-between p-5 rounded-2xl">
        <div className="w-full flex flex-col justify-start items-center gap-10">
          {data === true ? (
            <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-50"></div>
          ) : null}
          <Toaster richColors />
          <Image
            src={file ? file : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${updatedataA?.image}`}
            width={500}
            height={500}
            alt="Car Image"
          />
          {isDisabled === false ? (
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
                  setUpdateData({ ...updateData, image: e.target.files[0] });
                }}
                className="w-full text-black text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-black rounded"
              />
              {error?.image ? (
                <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
                  {error?.image}
                </p>
              ) : null}
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
            name="brand"
            disabled={isDisabled}
            placeholder="Brand"
            value={isDisabled ? `${updatedataA?.brand}` : updateData.brand}
          />
          {error?.brand ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.brand}
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
            disabled={isDisabled}
            placeholder="Model"
            value={isDisabled ? `${updatedataA?.model}` : updateData.model}
          />
          {error?.model ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.model}
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
            disabled={isDisabled}
            placeholder="Color"
            value={isDisabled ? `${updatedataA?.color}` : updateData.color}
          />
          {error?.color ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.color}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Fuels</h1>
          <select
            disabled={isDisabled}
            name="fuels"
            id="fuels"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option
              value={isDisabled ? `${updatedataA?.fuels}` : "GASOLINE"}
              className="font-bold"
            >
              {isDisabled ? `${updatedataA?.fuels}` : "GASOLINE"}
            </option>
            <option value="DIESEL">DIESEL</option>
          </select>
          {error?.fuels ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.fuels}
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
            disabled={isDisabled}
            placeholder="Matricule"
            value={
              isDisabled ? `${updatedataA?.matricule}` : updateData.matricule
            }
          />
          {error?.matricule ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.matricule}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Gear Box</h1>
          <select
            disabled={isDisabled}
            name="gear_box"
            id="fuels"
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
          >
            <option
              value={isDisabled ? `${updatedataA?.gear_box}` : "MANUAL"}
              className="font-bold"
            >
              {isDisabled ? `${updatedataA?.gear_box}` : "MANUAL"}
            </option>
            <option value="AUTO">AUTO</option>
          </select>
          {error?.gear_box ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.gear_box}
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
            type="text"
            name="passenger_capacity"
            disabled={isDisabled}
            placeholder="Passenger Capacity"
            value={
              isDisabled
                ? `${updatedataA?.passenger_capacity}`
                : updateData.passenger_capacity
            }
          />
          {error?.passenger_capacity ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.passenger_capacity}
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
            disabled={isDisabled}
            placeholder="Rent Price"
            value={
              isDisabled ? `${updatedataA?.rent_price}` : updateData.rent_price
            }
          />
          {error?.rent_price ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.rent_price}
            </p>
          ) : null}
          {isDisabled === false ? (
            <div className="flex gap-6">
              <button
                onClick={() => {
                  setUpdateData(UpdateData);
                  setIsDisabled(true);
                }}
                className="bg-[#ff2727] text-[#fff] p-2 mt-5 rounded-full w-full"
              >
                Cancle
              </button>
              <button
                onClick={() => {
                  validation();
                }}
                className="bg-[#000] text-[#fff] p-2 mt-5 rounded-full w-full"
              >
                Update
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleClick();
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
