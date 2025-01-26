import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context";


export const useUserContext = (propsUser?: User | null) => {
  const context = useContext(UserContext);
  const isInitialUser = propsUser && !context?.user;
  const isAnotherUserLoggedIn = propsUser?.email !== context?.user?.email;

  useEffect(() => {
    if (propsUser && (isInitialUser || isAnotherUserLoggedIn)) context.setUser(propsUser);
  }, [isInitialUser, isAnotherUserLoggedIn, propsUser]);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
