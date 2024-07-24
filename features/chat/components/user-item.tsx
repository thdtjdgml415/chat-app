import React from "react";
import { ChatUser } from "../model/chat";

import { CalendarDays } from "lucide-react";

import { splitDate } from "@/share/lib/utils";
import { Avatar, AvatarFallback } from "@/share/ui/avatar";
import { Button } from "@/share/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/share/ui/hover-card";

const UserItem: React.FC<ChatUser> = ({
  id,
  loginId,
  name,
  birthDate,
  gender,
  email,
  role,
  companyCode,
  state,
  profile,
  profileImage,
  isConnected,
}) => {
  return (
    <HoverCard>
      <li
        key={id}
        className="flex items-center text-md rounded-sm text-black hover:bg-black/10 pl-2"
      >
        {isConnected ? (
          <span className="w-2 h-2 bg-green-500 rounded-lg mr-5"></span>
        ) : (
          <span className="w-2 h-2 bg-red-500 rounded-lg mr-5"></span>
        )}
        <HoverCardTrigger asChild>
          <Button variant="link">{name}</Button>
        </HoverCardTrigger>
      </li>
      <HoverCardContent className="w-30">
        <div className="flex justify-between space-x-4">
          <Avatar>
            {/* <AvatarImage src={`${profileImage}`} /> */}
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{loginId}</h4>
            <p className="text-sm">{profile}</p>
            <p>{email}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {splitDate(birthDate)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserItem;
