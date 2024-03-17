"use client";
import { redirect } from "next/navigation";
import React from "react";

function Home({}) {
  redirect("/dashboard/default");
}

export default Home;
