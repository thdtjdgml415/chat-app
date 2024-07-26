import { ChatUser } from "@/features/chat/model/chat";
import { splitDate } from "@/share/lib/utils";
import { Button } from "@/share/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/share/ui/hover-card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

import { CalendarDays } from "lucide-react";

function HoverCardContents({
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
}: ChatUser) {
  return (
    <HoverCard>
      <li
        key={id}
        className="flex items-center pl-2 text-black rounded-sm text-md"
      >
        <HoverCardTrigger asChild>
          <Button variant="link">{name}</Button>
        </HoverCardTrigger>
      </li>
      <HoverCardContent>
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
              <CalendarDays className="w-4 h-4 mr-2 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {splitDate(birthDate)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
export default HoverCardContents;
