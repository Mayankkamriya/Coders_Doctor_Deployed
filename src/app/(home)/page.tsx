// "use client"
// import { useSession } from "next-auth/react";
// import { Suspense } from "react";
// import Banner from "./Components/Banner";
// import BookList from "./Components/BookList";
// import Loading from "@/src/Components/Loading";

// export default function Home() {
//   const { data: session } = useSession();
//   // console.log(session);

//   return (
//     <>
//       <Banner />
//       <Suspense fallback={<Loading />}> <BookList /> </Suspense>

//       {session ? (
//         // Signed-in view (optional, uncomment if needed)
//         <>
//           {/* Signed in as {session.user.email} <br/>
//           <button onClick={() => signOut()}>Sign out</button> */}
//         </>
//       ) : (
//         // Sign-in buttons (optional, uncomment if needed)
//         <>
//           {/* Not signed in <br/>
//           <button onClick={() => signIn("github")}>Sign in using Github</button><br />
//           <button onClick={() => signIn("google")}>Sign in using Google</button><br />
//           <button onClick={() => signIn("Email")}>Sign in using Email</button> */}
//         </>
//       )}
//     </>
//   );
// }


import { Suspense } from "react";
import Banner from "./Components/Banner"
import BookList from "./Components/BookList";
import Loading from "@/src/Components/Loading";
// import Appointment from "../MyAppointment/Appointment";

export default async function Home() {


  return (
<>
  <Banner/>
  <Suspense fallback={<Loading/>}>
    {/* <Appointment /> */}
    {/* <Suspense fallback={<Loading />}> <Appointment /> </Suspense> */}
    <BookList />
  </Suspense>
  {/* // </AppointmentList> */}
  </>
  );
}
