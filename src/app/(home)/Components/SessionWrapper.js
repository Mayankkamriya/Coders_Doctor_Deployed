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

  // const [showToast, setShowToast] = useState(false);

  // useEffect(() => {
  //   setShowToast(true);
  // }, []);
  // console.log(showToast)
  return <SessionProvider >
    <UserProvider>
      {children}
    </UserProvider>
    {/* {showToast &&<ToastContainer position="top-right" autoClose={2500} />} */}
  </SessionProvider>;
};

export default SessionWrapper;
