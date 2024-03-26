import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="max-w-6xl mx-auto flex-col sm:flex-row justify-between p-8 items-center">
      <div>
        <h1 className=" text-2xl flex gap-1">
          <h1 className=" font-bold">Welcome to</h1>
          <span>
            <span>CAR</span>
            <span className="font-bold">RENT</span>
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
        <h3 className="font-bold">Empowering Your Travel Experience</h3>
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
        <h3 className="font-bold">Driving Passion and Expertise</h3>
        <br />
        <p>
          Our team is comprised of passionate individuals dedicated to making
          your experience exceptional. Meet the faces behind CARRENT and
          discover the driving force behind our success.
        </p>
        <br />
        <h1 className="text-2xl font-bold">Get in Touch</h1>
        <br />
        <h3 className="font-bold">Ready for the Journey? Contact Us Today!</h3>
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
      <div>
        <Image
          className="mx-auto rounded-s-full"
          alt="about-car"
          src={"/hero-image.jpeg"}
          width={700}
          height={500}
        />
      </div>
    </div>
  );
}

export default About;
