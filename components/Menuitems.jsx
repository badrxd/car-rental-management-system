import Link from "next/link";
import React from "react";

export default function Menuitems({ title, link }) {
  return (
    <div className="uppercase hover:text-[#5e5d5d]">
      <Link href={link}>{title}</Link>
    </div>
  );
}
