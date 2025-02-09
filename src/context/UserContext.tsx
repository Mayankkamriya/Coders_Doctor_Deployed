import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import User from "@/src/types/User";
// import { connectDB } from "@/src/lib/mongodb";

// Define User Type
interface User {
  // id: string
  name: string;
  email: string;
  image?: string;
}

// Create Context
const UserContext = createContext<{ user: User | null }>({ user: null });

// Provider Component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (session?.user?.email) {
  //       try {
  //         const res = await fetch(`/api/user?email=${session.user.email}`, {
  //           method: 'GET',
  //         });
  //         if (res.ok) {
  //           const userData = await res.json();
  //           console.log('userData....in ',userData)
  //           setUser({
  //             id: userData._id, // Assign MongoDB ID
  //             name: userData.name,
  //             email: userData.email,
  //             image: userData.image,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user:", error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [session]);

  useEffect(() => {
    if (session) {
      setUser({
        // id: session.user?.id || "",
        name: session.user?.name || "",
        email: session.user?.email || "",
        image: session.user?.image || "",
      });
      // console.log('session in usercontext...',session)
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to Use Context
export const useUser = () => useContext(UserContext);
