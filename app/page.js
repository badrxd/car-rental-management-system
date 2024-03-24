import Hero from "@/components/Hero";
import Popularcars from "@/components/Popularcars";
import Cars from "@/components/Cars";
import Howitwork from "@/components/Howitwork";
import BestCar from "@/components/BestCar";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      <Hero />
      <h1 className="font-bold text-3xl mt-5">Our Popular Cars</h1>
      <Popularcars />
      <Howitwork />
      <h1 className="font-bold text-3xl mt-5">Resent Added Cars</h1>
      <Cars />
      <BestCar />
    </main>
  );
}
