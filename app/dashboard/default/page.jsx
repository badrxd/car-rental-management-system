"use server";
import React from "react";
import Widget from "@/components/dash_components/widget/Widget";
import TotalSpent from "@/components/dash_components/TotalSpent";
import WeeklyRevenue from "@/components/dash_components/WeeklyRevenue";
import CustomersData from "@/components/dash_components/variables/CustomersData";
import CarsData from "@/components/dash_components/variables/TopCarsData";
import TopCars from "@/components/dash_components/TopCars";
import TopCustomers from "@/components/dash_components/TopCustomers";
import { MdBarChart } from "react-icons/md";
import { IoPersonSharp, IoCar } from "react-icons/io5";

import { cookies } from "next/headers";
import { get_token } from "@/lib/frontEnd/getToken";

const Default = async () => {
  // this function takes cookies and return an authorization object
  const token = get_token(cookies);

  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/dashboard`,
    {
      cache: "no-store",
      headers: token,
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
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Year Earnings"}
          subtitle={`${data.year_earnings} MAD`}
        />
        <Widget
          icon={<IoPersonSharp className="h-6 w-6 text-black" />}
          title={"Customers"}
          subtitle={data.total_customers}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Year Reservations"}
          subtitle={data.year_reservations}
        />
        <Widget
          icon={<IoCar className="h-6 w-6" />}
          title={"Cars"}
          subtitle={data.total_cars}
        />
      </div>
      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent dataMonth={data?.month} />
        <WeeklyRevenue dataMonth={data?.month} />
      </div>
      {/* Complex Table , Task & Calendar */}
      <div className="mt-5 flex flex-col gap-4">
        <TopCustomers
          tabletitle={"Top Customers"}
          tableData={CustomersData(data?.top_customers)}
        />
        <TopCars tabletitle={"Top Cars"} tableData={CarsData(data?.top_cars)} />
      </div>
    </div>
  );
};

export default Default;
