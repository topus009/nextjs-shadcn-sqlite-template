import * as React from 'react'
import {ModeToggle} from "components/components/ui/mode-toggle";
import {Button} from 'components/components/ui/button';
import {
  LogIn,
  UserPlus,
} from "lucide-react"
import { useUserContext } from "../hooks/use-user-context";
import { useRouter } from 'next/navigation'
import {NavUser} from './nav-user';

export default function Nav() {
  const { user } = useUserContext();
  const router  = useRouter();
  const handleLogin = () => router.push('/login', { scroll: false });

  return (
    <>
      {user && <NavUser />}
      {!user && (
        <Button onClick={handleLogin} variant="outline" className="sm:inline-flex">
          <LogIn/>
          Sign In
        </Button>
      )}
      {!user && (
        <Button onClick={() => router.push('/register')}>
          <UserPlus/>
          Sign Up
        </Button>
      )}
      <ModeToggle />
    </>
  );
}
