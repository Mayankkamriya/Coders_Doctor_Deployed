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
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/src/context/UserContext";

const SessionWrapper = ({ children }) => {

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
  }, []);
  return <SessionProvider >
    <UserProvider>
      {children}
    </UserProvider>
    {/* {showToast &&<ToastContainer position="top-right" autoClose={2500} />} */}
  </SessionProvider>;
};

export default SessionWrapper;
