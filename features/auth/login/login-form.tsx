"use client";

import { signin } from "@/share/lib/action";
import { useFormState, useFormStatus } from "react-dom";

import Flex from "@/share/components/Layout/Flex";
import { Input } from "@/share";
import { Button } from "@/share/ui/button";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  // 2. Define a submit handler.
  const [state, action] = useFormState(signin, undefined);
  const route = useRouter();
  console.log("현재 validaion 상태", state);

  if (state?.resultCode === "SUCCESS") {
    localStorage.setItem("accessToken", state.data.tokenInfo.accessToken);
    localStorage.setItem("refreshToken", state.data.tokenInfo.refreshToken);
    route.push("/chat/chatroom");
  }

  return (
    <form action={action}>
      <Flex direction="flex-col" justify="justify-center" className="space-y-5">
        <Input type="text" name="loginId" />
        {state?.errors?.loginId && (
          <p className="text-sm text-red-500">{state.errors.loginId}</p>
        )}

        <Input type="password" name="password" />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </Flex>
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      className="w-full mt-6"
      aria-disabled={pending}
      type="submit"
      onClick={handleClick}
    >
      {pending ? "loading..." : "로그인"}
    </Button>
  );
}
