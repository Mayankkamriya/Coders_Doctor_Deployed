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

const SessionWrapper = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionWrapper;
