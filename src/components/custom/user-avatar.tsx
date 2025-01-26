"use client"

import * as React from 'react'
import {
  CircleUserRound,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "components/components/ui/avatar"

interface TProps {
  user?: User | null
  onlyAvatar?: boolean
}

export const UserAvatar: React.FC<TProps> = ({ user, onlyAvatar }) => {
  const hasUnreadMessages = false;
  return (
    <div className="relative">
      {(hasUnreadMessages && onlyAvatar) && (
        <span className="absolute z-10 top-0 right-0 transform -translate-y-1/2 w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"/>
      )}
      {onlyAvatar && (
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage
            src={user?.avatar}
            alt={user?.fullName} />
          <AvatarFallback className="rounded-full">
            <CircleUserRound
              size={32}
              absoluteStrokeWidth={true}/>
          </AvatarFallback>
        </Avatar>
      )}
      {!onlyAvatar && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.fullName}</span>
          <span className="truncate text-xs">{user?.email}</span>
        </div>
      )}
    </div>
  )
}

export default UserAvatar;
