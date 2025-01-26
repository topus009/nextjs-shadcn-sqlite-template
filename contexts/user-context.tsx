import { createContext, Dispatch, SetStateAction, useState } from "react";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
