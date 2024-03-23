import React, { Suspense } from "react";
import CustomerTable from "@/components/dash_components/CustomerTable";
import AllCarsTableData from "@/components/dash_components/variables/AllCarsTableData";
import { cookies } from "next/headers";
import Loading from "../Loading";
import Link from "next/link";
import { redirect } from "next/navigation";
import Btn from "./btn";
import Search from "./search";

const Customer = async ({ params, searchParams }) => {
  const { page, driver_id } = await searchParams;

  let search = "";
  if (driver_id !== undefined && page !== undefined) {
    redirect(`/dashboard/customers?page=1`);
  } else if (page !== undefined) {
    search = `?page=${page}&limit=5`;
  } else if (driver_id !== undefined) {
    search = `?driver_id=${driver_id}`;
  } else {
    redirect(`/dashboard/customers?page=1`);
  }
  const cookieStore = cookies();
  const token =
    process.env.NODE_ENV === "production"
      ? cookieStore.get("__Secure-next-auth.session-token")?.value
      : cookieStore.get("next-auth.session-token")?.value;
  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/customers${search}`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await reponse.json();

  if (data?.error) {
    return (
      <div className="mt-10">
        <h1 className="text-3xl">Data Not Found</h1>
      </div>
    );
  }
  const pages = Math.ceil(Number(data.totalCustomers) / 5);
  return (
    <Suspense fallback={<Loading />}>
      <div className="pt-5">
        <div className="flex justify-between bg-[#fff] rounded-full p-5">
          <Search />
          <div>
            <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
              <Link href={"/dashboard/customers/newcustomer"}>
                Add New Customer
              </Link>
            </button>
          </div>
        </div>
        <div className="pt-5">
          <CustomerTable tableData={AllCarsTableData(data.allCustomers)} />
        </div>
      </div>
      <div className="flex gap-5 mt-9 justify-end ">
        {page !== undefined ? <Btn pages={pages} page={page} /> : null}
      </div>
    </Suspense>
  );
};

export default Customer;
