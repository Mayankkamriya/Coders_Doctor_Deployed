"use client";
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import React from 'react';
import { useUser } from "@/src/context/UserContext";

const Navbar = () => {
  // const { data: session } = useSession();
const {user} = useUser()
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <div>
          <Link href={'/'}>
            <div className="flex items-center gap-1">
              <div className="relative">
                <Hexagon />
                <BookIcon />
              </div>
              <span className="text-xl font-bold uppercase tracking-tight text-primary-500">
                Coders Book
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            // Show Sign-in button if not signed in
            <Link href="/api/auth/signin">
              <button className="h-10 rounded-md border border-primary-500 px-4 py-2 text-sm font-medium text-primary-500 transition-all hover:border-primary-100 hover:bg-primary-100 active:border-primary-200 active:bg-primary-200">
                Sign in using GitHub
              </button>
            </Link>
          ) : (
            // Show user email and Sign-out button if signed in
            <>
             {/* normal sqare shape image  */}
             <img
                  src={user?.image || '/default-avatar.png'}  // Fallback image if no image is available
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              <span className="h-10 rounded-md border border-primary-500 px-4 py-2 text-sm font-medium text-primary-500 transition-all">Welcome {user?.name}</span>
              <button
                onClick={() => signOut()}
                className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import Link from 'next/link';
// import React from 'react';
// const Navbar = () => {
//     return (
//         <nav className="border-b w-full">
//             <div className="max-w-7xl w-full mx-auto mx-auto flex items-center justify-between py-4">
//                 <div>
//                     <Link href={'/'}>
//                         <div className="flex items-center gap-1">
//                             <div className="relative">
//                                 <Hexagon />
//                                 <BookIcon />
//                             </div>
//                             <span className="text-xl font-bold uppercase tracking-tight text-primary-500">
//                                 Doctors List
//                             </span>
//                         </div>
//                     </Link>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <Link href={`http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`}>
//                     <button className="h-10 rounded-md border border-primary-500 px-4 py-2 text-sm font-medium text-primary-500 transition-all hover:border-primary-100 hover:bg-primary-100 active:border-primary-200 active:bg-primary-200"
//                     // onClick={() => signIn()}
//                     > Sign in using GitHub
//                     </button></Link>
//                     <button className="h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700">
//                         Sign up
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// };
// export default Navbar;
const Hexagon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"
        fill="#ce7041"
        stroke="#ce7041"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hexagon">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
);
const BookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth={2}
        
        width="25"
        height="25"

        stroke="#ce7041"
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
    </svg>
);
