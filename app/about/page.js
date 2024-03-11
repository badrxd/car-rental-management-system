import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto flex-col sm:flex-row justify-between p-8 items-center">
      <div>
        <h1 className=" text-2xl font-bold">
          Welcome to
          <span className="text-[#f1c40f]">
            Car<span className="text-black font-bold">Rent</span>
          </span>
        </h1>
        <br />
        <p>
          At CARRENT, we&apos;re more than just a car rental service –
          we&apos;re your reliable partner on the road to unforgettable
          journeys. Established in 2024, our passion for providing top-notch
          vehicles and exceptional customer service has driven us to become a
          trusted name in the car rental industry.
        </p>
        <br />
        <p className="text-2xl font-bold">Our Mission</p>
        <br />
        <h3>Empowering Your Travel Experience</h3>
        <br />
        <p>
          Our mission is simple: to empower your travel experience by offering a
          diverse and well-maintained fleet of vehicles, coupled with a
          commitment to unmatched customer service. We believe that your journey
          should be as enjoyable and stress-free as possible, and we&apos;re
          here to make that a reality.
        </p>
        <br />
        <h1 className=" text-2xl font-bold">Meet Our Team</h1>
        <br />
        <h3>Driving Passion and Expertise</h3>
        <br />
        <p>
          Our team is comprised of passionate individuals dedicated to making
          your experience exceptional. Meet the faces behind CARRENT and
          discover the driving force behind our success.
        </p>
        <br />
        <h1 className="text-2xl">Get in Touch</h1>
        <br />
        <h3>Ready for the Journey? Contact Us Today!</h3>
        <br />
        <p>
          Your journey begins with a simple click or call.
          <a href="/contact" className="text-blue">
            Contact us
          </a>
          today to book your next adventure or to inquire about our services.
          We&apos;re here to make your travel dreams a reality.
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default About;
