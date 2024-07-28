"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { User } from "@/features/auth/model/auth";
import { Button } from "@/share/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/share/ui/form";
import { Input } from "@/share/ui/input";
import { formSchema } from "./formSchema";

import useAlert from "@/hooks/useAlert";
import PopupAlert from "@/share/components/Alert/PopupAlert";
import Link from "next/link";

export default function LoginForm() {
  const mutation = useLogin();
  const isOpen = useAlert((state) => state.isOpen);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = form.handleSubmit(async (data: User) => {
    console.log("login client data :", data);
    mutation.mutate({ loginId: data.loginId, password: data.password });
  });

  return (
    <Form {...form}>
      {isOpen && <PopupAlert />}
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="loginId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="Please enter id....!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Please enter password....!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ul className="flex justify-center">
          <li className="go-signup">
            <Link href={"/sign-up"}>아이디 찾기</Link>
          </li>
          <li className="go-signup">
            <Link href={"/sign-up"}>비밀번호 찾기</Link>
          </li>
          <li className="go-signup">
            <Link href={"/sign-up"}>회원가입</Link>
          </li>
        </ul>

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </Form>
  );
}
