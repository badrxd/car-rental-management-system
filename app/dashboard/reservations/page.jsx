import React, { Suspense } from "react";
import ReservationsTable from "@/components/dash_components/ReservationsTable";
import ReservationsTableData from "@/components/dash_components/variables/ReservationsTableData";
import { cookies } from "next/headers";
import Loading from "../Loading";
import Link from "next/link";
import { redirect } from "next/navigation";
import Btn from "./btn";
import Search from "./search";

const Reservations = async ({ params, searchParams }) => {
  const { page, reservation_number } = await searchParams;

  let search = "";
  if (reservation_number !== undefined && page !== undefined) {
    redirect(`/dashboard/reservations?page=1`);
  } else if (page !== undefined) {
    search = `?page=${page}&limit=10`;
  } else if (reservation_number !== undefined) {
    search = `?reservation_number=${reservation_number}`;
  } else {
    redirect(`/dashboard/reservations?page=1`);
  }
  const cookieStore = cookies();
  const token =
    process.env.NODE_ENV === "production"
      ? cookieStore.get("__Secure-next-auth.session-token")?.value
      : cookieStore.get("next-auth.session-token")?.value;
  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/reservations${search}`,
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
  const pages = Math.ceil(Number(data.totalReservations) / 10);
  return (
    <Suspense fallback={<Loading />}>
      <div className="pt-5">
        <div className="flex justify-between bg-[#fff] rounded-full p-5">
          <Search />
          <div>
            <button className="bg-[#000] text-[#fff] p-2 rounded-full w-40">
              <Link href={"/dashboard/reservations/newreservation"}>
                New Reservation
              </Link>
            </button>
          </div>
        </div>
        <div className="pt-5">
          <ReservationsTable
            tableData={ReservationsTableData(data.allReservation)}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-9 justify-end ">
        {page !== undefined ? <Btn pages={pages} page={page} /> : null}
      </div>
    </Suspense>
  );
};

export default Reservations;
