import Hero from "@/components/Hero";
import Popularcars from "@/components/Popularcars";
import Cars from "@/components/Cars";
import Howitwork from "@/components/Howitwork";
import BestCar from "@/components/BestCar";
import Link from "next/link";
export const revalidate = 10;

export default async function Home() {
  const CarData = await fetch(`${process.env.NEXTAUTH_URL}/api/public/cars`, {
    cache: "no-store",
  });
  const result = await CarData.json();
  return (
    <main className="max-w-6xl mx-auto relative">
      <Hero />
      <h1 className="font-bold text-3xl mt-5">Our Popular Cars</h1>
      <Popularcars data={result.top_cars} />
      <Howitwork />
      <BestCar data={result.allCars} />
      <h1 className="font-bold text-3xl mt-5">Available Cars</h1>
      <Cars data={result.allCars} />
      <div className="flex justify-center items-center mt-5">
        <button className="bg-[#000000] hover:bg-[#454545] w-40 text-white rounded-full p-2">
          <Link href={"/cars"}>Show More</Link>
        </button>
      </div>
    </main>
  );
}
