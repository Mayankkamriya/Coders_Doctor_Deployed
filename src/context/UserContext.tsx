import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

// Define User Type
interface User {
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

  useEffect(() => {
    if (session) {
      setUser({
        name: session.user?.name || "",
        email: session.user?.email || "",
        image: session.user?.image || "",
      });
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
