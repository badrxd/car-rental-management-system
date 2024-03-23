"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Validator from "@/lib/frontEnd/zodValidation";
import { toast, Toaster } from "sonner";

function Search() {
  const [driver_id, setDriverId] = useState("");
  const validate = () => {
    const err = Validator.findCusByLicId({ driver_id });
    if (err?.error !== false) {
      toast.error("Error", { description: `${err.message}` });
      return null;
    }
    window.location.replace(`/dashboard/customers?driver_id=${driver_id}`);
  };
  useEffect(() => {}, [driver_id]);
  return (
    <div className="flex items-center bg-lightPrimary  dark:bg-navy-900 rounded-full w-96">
      <span className="pl-3 pr-2 text-xl">
        <button
          onClick={() => {
            validate();
          }}
        >
          <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
        </button>
      </span>
      <input
        value={driver_id}
        onChange={(e) => {
          setDriverId(e.target.value.toLowerCase());
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            validate();
          }
        }}
        type="text"
        placeholder="License ID..."
        className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-full"
      />
      <Toaster richColors />
    </div>
  );
}

export default Search;
