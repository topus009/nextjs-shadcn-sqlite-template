import { createContext, Dispatch, SetStateAction, useState, useEffect } from "react";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fallback: if no page calls useUserContext within a reasonable time,
  // set loading to false to prevent buttons from being hidden forever
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Short timeout to allow useUserContext to run first

    return () => clearTimeout(timeout);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
