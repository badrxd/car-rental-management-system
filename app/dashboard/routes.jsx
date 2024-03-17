import React from "react";

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdDirectionsCarFilled,
  MdBookmarks,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/dashboard",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "Cars",
    layout: "/dashboard",
    path: "cars",
    icon: <MdDirectionsCarFilled className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Customers",
    layout: "/dashboard",
    path: "customers",
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "Reservations",
    layout: "/dashboard",
    path: "reservations",
    icon: <MdBookmarks className="h-6 w-6" />,
  },
];
export default routes;
