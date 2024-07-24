"use client";

import UserList from "@/features/chat/components/user-list";
import useToggle from "@/hooks/useToggle";
import ToggleListBtn from "@/share/atom-components/toggle-list-button";

export default function ChatUserList() {
  const [isToggle, setIsToggle] = useToggle();

  return (
    <>
      <ToggleListBtn
        toggleFn={setIsToggle}
        state={isToggle}
        label={"유저 상태"}
      />

      {isToggle && <UserList />}
    </>
  );
}
