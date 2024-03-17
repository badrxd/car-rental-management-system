import { redirect } from "next/navigation";

function Home({}) {
  redirect("/dashboard/default");
}

export default Home;
