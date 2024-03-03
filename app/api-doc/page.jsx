import ReactSwagger from "./react-swagger";
import { getApiDocs } from "@/lib/swagger";

export default async function ApiDocPage() {
  const spec = await getApiDocs();
  return (
    <section className="w-full">
      {spec !== null && spec !== undefined ? (
        <ReactSwagger spec={spec} />
      ) : (
        "null"
      )}
    </section>
  );
}
