"use client";

import { cn } from "@/share/lib/utils";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
interface SideMenuProps {
  toggleFn: () => void;
  isToggle: boolean;
}

export const SideHeader: React.FC<SideMenuProps> = ({ toggleFn, isToggle }) => {
  return (
    <div
      role="button"
      aria-expanded={`${isToggle ? true : false}`}
      aria-controls="sidemenu"
      className={cn(
        "min-w-[40px] min-h-[40px] mr-2 flex items-center justify-center rounded-md hover:bg-ST_grayHover1  "
      )}
      onClick={() => toggleFn()}
    >
      <RxHamburgerMenu className="w-5 h-5 text-black" />
    </div>
  );
};
