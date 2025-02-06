// "use client"
// import { SessionProvider } from "next-auth/react"
// const SessionWrapper = ({ Component, pageProps: { session, ...pageProps } }) => {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//     // <SessionProvider>{children}</SessionProvider>
//   )
// }
// export default SessionWrapper


"use client";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/src/context/UserContext";

const SessionWrapper = ({ children }) => {
  return <SessionProvider ><UserProvider>{children}</UserProvider></SessionProvider>;
};

export default SessionWrapper;
