import Link from "next/link";
import React from "react";

export default function Menuitems({ title, link }) {
  return (
    <div className="uppercase">
      <Link href={link}>{title}</Link>
    </div>
  );
}
