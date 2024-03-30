"use client";
import React, { useState } from "react";
import Validator from "@/lib/frontEnd/zodValidation";
import useSWRMutation from "swr/mutation";
import { toast, Toaster } from "sonner";

async function sendData(url, { arg }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}
const Page = ({ params }) => {
  // this opejct will hold the new customer data
  const newData = {
    full_name: null,
    driver_id: null,
    phone: null,
  };
  ///////////////////////////////////////////////////////////////////////////////
  const [newCustomer, setNewCustomer] = useState(newData);
  const [error, setEroor] = useState(false);
  const [data, setData] = useState(false);
  const {
    trigger,
    error: post_err,
    isMutating,
  } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/customers`,
    sendData
  );

  if (post_err) {
    return <div>error</div>;
  }
  ///////////////////////////////////////////////////////////////////////////////
  const handleAddCustomer = async () => {
    try {
      const result = await trigger(newCustomer);
      const data = await result.json();
      if (result.ok) {
        toast.success("Success", {
          description: "Customer Added successfully",
        });
      } else {
        toast.error("Error", { description: `${data.message}` });
      }
    } catch (error) {
      toast.error("Error", { description: `${error.message}` });
    }
  };
  // this function will update the data on the onChange event
  const update = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validation = () => {
    const err = Validator.profilevalidation(newCustomer);
    setEroor(err);
    console.log(err);
    if (err?.error !== false) {
      return null;
    }
    handleAddCustomer();
  };
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="mt-10 bg-[#fff] flex justify-between p-5  gap-10 rounded-2xl">
        {isMutating ? (
          <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-50"></div>
        ) : null}
        <Toaster richColors />
        <div className="w-full">
          <h1 className="uppercase p-3 text-gray-700 font-bold">full name</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="full_name"
            placeholder="full name"
          />
          {error?.full_name ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.full_name}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">Driver ID</h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="text"
            name="driver_id"
            placeholder="driver id"
          />
          {error?.driver_id ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.driver_id}
            </p>
          ) : null}
          <h1 className="uppercase p-3 text-gray-700 font-bold">
            phone number
          </h1>
          <input
            onChange={(e) => {
              update(e);
            }}
            className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            type="number"
            name="phone"
            placeholder="phone number"
          />
          {error?.phone ? (
            <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
              {error?.phone}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => validation()}
          className="bg-[#000000] text-[#fff] p-2 mt-5 rounded-full w-40"
        >
          Add New Customer
        </button>
      </div>
    </>
  );
};

export default Page;
