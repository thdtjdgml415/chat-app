"use client";

import { ChatIcon, CommunityIcon } from "@/public/Images/side-menuSvg";
import { SideHeader } from "./side-header";

import AuthService from "@/features/auth/api/AuthService";
import useToggle from "@/hooks/useToggle";
import { Button } from "@/share/ui/button";
import { usePathname, useRouter } from "next/navigation";
import ConfigDialog from "../mypage/config-dialog";
import { SideItem } from "./side-item";

const menuItems = [
  { id: 1, label: "친구", link: "/chat", icon: <CommunityIcon /> },
  { id: 2, label: "채팅방", link: "/chat/chatroom", icon: <ChatIcon /> },
];

export const SideMenu = () => {
  const path = usePathname();
  console.log(path);
  const route = useRouter();
  const [isToggle, toggleFn] = useToggle();

  const handleLogOut = async () => {
    try {
      const response: any = await AuthService.getOut();
      console.log("LogOut ----------", response);

      if (response.message === "Log Out Successfully") {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        // 로그아웃 성공 후 처리, 예를 들어 홈페이지로 리다이렉트
        route.push("/sign-in");
      }
    } catch (error) {
      console.error("Logout failed", error);
      // 에러 처리, 예를 들어 사용자에게 에러 메시지 표시
    }
  };

  return (
    <header
      className={`${
        isToggle ? "min-w-[200px]" : "max-w-[65px]"
      }  h-screen hidden sm:flex flex-col items-center px-3 bg-ST_primary`}
    >
      <div className="w-full mx-3 mt-6 mb-4 text-center h-9">
        <div className="flex items-center w-full">
          <SideHeader toggleFn={toggleFn} isToggle={isToggle} />
        </div>
      </div>
      <div className="w-full mb-20">
        <ul className={`${isToggle ? "w-full" : "w-[40px]"}`}>
          {menuItems.map((list) => {
            return (
              // <RowList
              //   key={list.id}
              //   left={list.icon}
              //   content={list.label}
              //   as="li"
              // />

              <SideItem
                key={list.id}
                items={list}
                activeMenuWidthState={isToggle}
                path={path}
              />
            );
          })}
        </ul>
      </div>
      <div className="w-full">
        <ConfigDialog onOpenChange={toggleFn} />
      </div>
      <Button onClick={() => handleLogOut()} className="bg-destructive">
        로그아웃
      </Button>
    </header>
  );
};
