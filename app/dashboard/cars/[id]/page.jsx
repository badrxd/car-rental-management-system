import React from "react";

export default async function page({ params }) {
  const reponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/privet/cars/${params.id}`,
    {
      cache: "no-store",
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
  console.log(data);
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
