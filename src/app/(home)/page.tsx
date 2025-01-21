import { Suspense } from "react";
import Banner from "./Components/Banner"
import BookList from "./Components/BookList";
import Loading from "@/src/Components/Loading";

export default async function Home() {


  return (<>

  <Banner/>
  <Suspense fallback={<Loading/>}>
    <BookList />
  </Suspense>

  </>
  );
}
