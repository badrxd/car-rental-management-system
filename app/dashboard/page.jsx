"use server";
import React from "react";
import Widget from "@/components/dash_components/widget/Widget";
import TotalSpent from "@/components/dash_components/TotalSpent";
import { MdBarChart } from "react-icons/md";
import { IoPersonSharp, IoCar } from "react-icons/io5";

const Dashboard = async () => {
  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/dashboard`,
    {
      cache: "no-store",
    }
  );
  const data = await reponse.json();
  console.log(data);
  if (data.error) {
    return (
      <div>
        <h1>Page Not Found</h1>
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
          subtitle={data.year_earnings}
        />
        <Widget
          icon={<IoPersonSharp className="h-6 w-6" />}
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
        <TotalSpent />
        {/* <WeeklyRevenue /> */}
      </div>
    </div>
  );
};

export default Dashboard;
