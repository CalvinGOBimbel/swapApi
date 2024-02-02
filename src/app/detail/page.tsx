import Planet from "@/components/detail/planet";
import Link from "next/link";


function Detail() {
  return (
    <>
      <Link href="/">Back</Link>
      <h1>Detail Page</h1>
      <Planet/>
    </>
  );
}

export default Detail;
