"use client"

import * as React from 'react'
import {
  // Settings,
  LogOut,
  UserPlus,
  MessageCircleMore,
  Home,
  Bug,
  LogIn,
  Key,
  HelpCircle,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/components/ui/dropdown-menu"
import { apiLogout } from '../../lib/apiCommunicator'
import { useRouter } from 'next/navigation'
import { useUserContext } from "../hooks/use-user-context";
import UserAvatar from './custom/user-avatar'
import {Button} from './ui/button'

const items = [
  {
    label: 'Home',
    value: '/',
    icon: Home,
  },
  {
    label: 'Bugs',
    value: '/bugs',
    icon: Bug,
  },
  {
    label: 'Feedback',
    value: '/feedback',
    icon: MessageCircleMore,
  },
  {
    label: 'Change Password',
    value: '/change-password',
    icon: Key,
  },
  {
    label: 'Forgot Password',
    value: '/forgot-password',
    icon: HelpCircle,
  },
]

const authItems = [
  {
    label: 'Login',
    value: '/login',
    icon: LogIn,
  },
  {
    label: 'Register',
    value: '/register',
    icon: UserPlus,
  },
]

export function NavUser() {
  const { user } = useUserContext();
  const router  = useRouter();

  const handleLogin = () => {
    apiLogout().then(() => {
      window.location.href = '/';
      // setUser(undefined);
      // router.refresh();
    })
  }

  const renderItems = () => {
    return items.map((item) => {
      const Icon = item.icon;
      return (
        <DropdownMenuItem key={item.value} onClick={() => router.push(item.value)}>
          <Icon />
          {item.label}
        </DropdownMenuItem>
      );
    });
  }

  const renderAuthItems = () => {
    return authItems.map((item) => {
      const Icon = item.icon;
      return (
        <DropdownMenuItem key={item.value} onClick={() => router.push(item.value)}>
          <Icon />
          {item.label}
        </DropdownMenuItem>
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className='p-0 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0'>
          <UserAvatar user={user} onlyAvatar={true} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar user={user}/>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Main Navigation Pages */}
        {renderItems()}

        <DropdownMenuSeparator />

        {/* Authentication Pages (for reference/quick access) */}
        {renderAuthItems()}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogin}>
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
