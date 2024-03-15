"use server";
import React from "react";
import Widget from "@/components/dash_components/widget/Widget";
import { MdBarChart } from "react-icons/md";
import { IoPersonSharp, IoCar } from "react-icons/io5";

const Dashboard = async () => {
  const reponse = await fetch("http://localhost:3000/api/privet/dashboard");
  const data = await reponse.json();

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-4">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Year Earnings"}
          subtitle={data?.year_earnings}
        />
        <Widget
          icon={<IoPersonSharp className="h-6 w-6" />}
          title={"Customers"}
          subtitle={data.customers}
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
    </div>
  );
};

export default Dashboard;
