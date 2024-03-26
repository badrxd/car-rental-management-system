import Image from "next/image";
import React from "react";
import { MdOutlineEmail } from "react-icons/md";

function Contact() {
  return (
    <div className="max-w-6xl mx-auto pt-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Get in Touch</h1>
          <p>
            We&apos;re here to help. Contcat us for any inquiries or support
          </p>
          <Image src={"/map.png"} alt="map image" width={950} height={500} />
        </div>
        <div>
          <div>
            <span className="flex gap-1 items-center">
              <MdOutlineEmail /> <h1>Email</h1>
            </span>
            support@carrent.com
          </div>
          <div>
            <span className="flex gap-1 items-center">
              <MdOutlineEmail /> <h1>Phone</h1>
            </span>
            +212 632 323 223
          </div>
          <div>
            <span className="flex gap-1 items-center">
              <MdOutlineEmail /> <h1>Office</h1>
            </span>
            Rue 1337 NL ALX AFRICA
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Contact;
