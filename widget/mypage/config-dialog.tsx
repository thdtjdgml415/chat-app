"use client";

import AdminPermission from "@/features/mypage/admin-permission/admin-permission";
import { menuList } from "@/features/mypage/model/myConfig";
import UserInfoForm from "@/features/mypage/myaccount/user-form";
import { ConfigIcon } from "@/public/Images/side-menuSvg";

import { Dialog, DialogContent, DialogTrigger } from "@/share";
import React, { useState } from "react";

export default function ConfigDialog({
  onOpenChange,
}: {
  onOpenChange: () => void;
}) {
  const [locate, setLocate] = useState("accountConfig");

  const handleListActive = (e: any) => {
    setLocate(e.target.ariaLabel);
  };
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-md hover:bg-muted">
          <ConfigIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen flex font-pretendard">
        <div className="flex min-w-40 w-2/5 max-md:flex-wrap bg-secondary justify-end ">
          <div className="text-black text-xl mt-10">
            {menuList.map((title) => {
              return (
                <React.Fragment key={title.title}>
                  <p className="text-sm text-slate-400 font-bold">
                    {title.title}
                  </p>
                  <hr />
                  <ul>
                    {title.menu.map((e) => {
                      return (
                        <li
                          key={e.link}
                          aria-label={e.link}
                          className={`text-center text-[16px] py-2 px-10 hover:bg-[#a4a4a4ca] ${
                            locate === e.link ? "bg-menu text-white" : ""
                          }`}
                          onClick={(e) => handleListActive(e)}
                        >
                          {e.item}
                        </li>
                      );
                    })}
                  </ul>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="w-full h-screen overflow-y-auto">
          <div className="px-10">
            {locate === "accountConfig" ? (
              <UserInfoForm />
            ) : locate === "permisson" ? (
              <AdminPermission />
            ) : (
              <div>준비중</div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
