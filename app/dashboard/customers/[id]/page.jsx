"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoMdPersonAdd } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import Validator from "@/lib/frontEnd/zodValidation";
import ReservationsTable from "@/components/dash_components/ReservationsTable";
import ReservationsTableData from "@/components/dash_components/variables/ReservationsTableData";
import useSWR, { mutate } from "swr";
import { toast, Toaster } from "sonner";
import Loading from "@/components/dash_components/loading";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = ({ params }) => {
  // This opejct will hold the new customer data
  const newData = {
    full_name: null,
    driver_id: null,
    phone: null,
    blacklist: null,
  };
  ///////////////////////////////////////////////////////////////////////////////
  // useStates here
  const [updateData, setUpdateData] = useState(newData);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setEroor] = useState(false);
  let [data, setData] = useState(false);
  ///////////////////////////////////////////////////////////////////////////////

  //   const cookieStore = cookies();
  //   const token =
  //     process.env.NODE_ENV === "production"
  //       ? cookieStore.get("__Secure-next-auth.session-token")?.value
  //       : cookieStore.get("next-auth.session-token")?.value;
  //   const reponse = await fetch(`${process.env.NEXTAUTH_URL}/api/privet/cars`, {
  //     cache: "no-store",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   const data = await reponse.json();

  //   if (data?.error) {
  //     return (
  //       <div className="mt-10">
  //         <h1 className="text-3xl">Data Not Found</h1>
  //       </div>
  //     );
  //   }
  ///////////////////////////////////////////////////////////////////////////////
  // this fetch will get the customer Data using SWR Hook
  let sendeddata = {};
  const {
    data: firstData,
    error: updateError,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/privet/customers/${params.id}`,
    fetcher
  );
  if (updateError) {
    return <div>error</div>;
  }
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log(firstData);
  // console.log(profiledata.reservation);
  ///////////////////////////////////////////////////////////////////////////////
  // here i will handel the edit button click
  const btnClick = () => {
    setIsDisabled(!isDisabled);
  };

  ///////////////////////////////////////////////////////////////////////////////
  // this function will update the data on the onChange event
  const update = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  ///////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////
  // here we will handel the update profil data function
  const updateProfileData = async () => {
    try {
      setData(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/privet/customers/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(sendeddata),
        }
      );
      if (response.ok) {
        const newData = await response.json();
        const updatedData = [newData?.customer];
        mutate(
          `${process.env.NEXT_PUBLIC_URL}/api/privet/customers/${params.id}`,
          updatedData[0],
          true
        );
        setIsDisabled(true);
        toast.success("Success", {
          description: "Profile Info Updated successfully",
        });
      } else {
        const newData = await response.json();
        toast.error("Error", { description: `${newData.message}` });
      }
    } catch (error) {
      toast.error("Error", { description: `${error.message}` });
    } finally {
      setData(false);
    }
  };

  const validation = () => {
    const err = Validator.profilevalidationpatch(updateData);
    setEroor(err);
    console.log(updateData.blacklist);
    console.log(err);
    if (err?.error !== false) {
      return null;
    }
    let c = 0;
    for (const key in updateData) {
      const obj = updateData[key];
      if (obj !== null && obj !== "") {
        c += 1;
        sendeddata[key] = updateData[key];
      }
    }
    if (c === 0) {
      return null;
    }
    updateProfileData();
  };
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="mt-10 bg-[#fff] flex justify-between p-5  gap-10 rounded-2xl">
        {data === true ? (
          <div className="fixed bg-gray-400 opacity-50 h-full w-full top-0 left-0 bottom-0 right-0 z-50"></div>
        ) : null}
        <div className="w-full flex flex-col gap-3">
          <Toaster richColors />
          <div className="flex">
            <div className="flex flex-col justify-center items-center p-5">
              <Image
                className="rounded-full"
                src={"/avatar.png"}
                width={200}
                height={200}
                alt="avatar"
              />
              {/* <div className='w-[200px] h-[200px] bg-gray-200 rounded-full flex justify-center items-center'><IoMdPersonAdd className='text-[#fff] text-3xl'/>
                </div> */}
            </div>
            <div className="w-full p-5 flex flex-col justify-center items-start">
              <h1 className="text-3xl font-bold uppercase">
                {firstData?.customer?.full_name}
              </h1>
              <h1 className="mt-3">
                Driver ID: {firstData?.customer?.driver_id}
              </h1>
              <h1 className="mt-3">Phone: {firstData?.customer?.phone}</h1>
              <h1 className="mt-3">Joind: 3 months ago</h1>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="flex flex-col items-center p-5">
              <span className="flex gap-2 font-bold">
                <GrMoney className="text-2xl" />
                SPENDING
              </span>
              {firstData?.customer?.spending}
            </span>
            <span className="flex flex-col items-center p-5">
              <span className="flex gap-2 font-bold">
                <IoBookmarksOutline className="text-2xl font-bold" />
                N° Reservations
              </span>
              {firstData?.customer?.num_of_res}
            </span>
            <span className="flex flex-col items-center p-5">
              <span className="flex gap-2 font-bold">
                <MdBlockFlipped className="text-2xl" />
                BLACK LIST
              </span>
              {firstData?.customer?.blacklist ? "YES" : "NO"}
            </span>
          </div>
        </div>
        {/* /////////////////////////////////////////// */}
        {isDisabled ? null : (
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
            />
            {error?.phone ? (
              <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
                {error?.phone}
              </p>
            ) : null}
            <h1 className="uppercase p-3 text-gray-700 font-bold">balcklist</h1>
            <select
              onChange={(e) => {
                const v = e.target.value;
                let val = null;
                if (v === "true") {
                  val = true;
                } else {
                  val = false;
                }
                setUpdateData((prevData) => ({ ...prevData, blacklist: val }));
              }}
              name="blacklist"
              className="p-2 pl-6 uppercase rounded-full bg-[#F4F7FE] w-full"
            >
              <option value=""></option>
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </select>
            {error?.blacklist ? (
              <p className="bg-[#ff2727] text-[#fff] p-2 mt-2 rounded-full w-full">
                {error?.blacklist}
              </p>
            ) : null}
          </div>
        )}
        {/* /////////////////////////////////////////// */}
      </div>
      <div className="flex justify-end gap-2">
        {isDisabled ? (
          <button
            onClick={btnClick}
            className="bg-[#000] text-[#fff] p-2 mt-5 rounded-full w-40"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                setIsDisabled(true);
              }}
              className="bg-[#ff2727] text-[#fff] p-2 mt-5 rounded-full w-40"
            >
              Cancle
            </button>
            <button
              onClick={(first) => {
                validation();
              }}
              className="bg-[#000000] text-[#fff] p-2 mt-5 rounded-full w-40"
            >
              Update
            </button>
          </>
        )}
      </div>
      <div className="mt-5 rounded-2xl">
        <ReservationsTable
          tableData={ReservationsTableData(firstData?.customer?.reservation)}
        />
      </div>
    </>
  );
};

export default Page;
