import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user-context";


export const useUserContext = (propsUser?: User | null) => {
  const context = useContext(UserContext);
  const isInitialUser = propsUser && !context?.user;
  const isAnotherUserLoggedIn = propsUser?.email !== context?.user?.email;

  useEffect(() => {
    if (propsUser && (isInitialUser || isAnotherUserLoggedIn)) {
      context.setUser(propsUser);
    }
    // Set loading to false once we've determined the user state
    // This happens after the first render when we have server-side props
    context.setIsLoading(false);
  }, [isInitialUser, isAnotherUserLoggedIn, propsUser, context]);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
