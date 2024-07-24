"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/share/ui/button";
import { Calendar } from "@/share/ui/calendar";

import { formSchema } from "@/features/auth/sign-up/formSchema";
import { cn, formatDate } from "@/share/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/share/ui/popover";

import { useSignUp } from "@/features/auth/hooks/useSignup";
import { UserInfo } from "@/features/auth/model/auth";
import { CalendarIcon } from "lucide-react";

import AlertSignUp from "@/features/auth/sign-up/alert-signup";
import useAlert from "@/hooks/useAlert";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/share";
import CustomGroupRadio from "@/share/atom-components/custom-group-Radio";
import CustomInput from "@/share/atom-components/custom-input";

export default function SignUpForm() {
  const mutation = useSignUp();
  const isOpen = useAlert((state) => state.isOpen);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginId: "",
      password: "",
      name: "",
      gender: "MAN",
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = form.handleSubmit((data: UserInfo) => {
    let formattedBirthDate = formatDate(data.birthDate);
    const { birthDate, ...restData } = data;
    const formattedData = {
      ...restData,
      birthDate: formattedBirthDate,
    };
    console.log("sign-up data : ", formattedData);
    mutation.mutate(formattedData);
  });

  return (
    <Form {...form}>
      {isOpen && <AlertSignUp content="회원가입" />}
      <form onSubmit={onSubmit} className="space-y-4">
        <CustomInput
          name="loginId"
          form={form}
          label="ID"
          placeholder={"Please enter id....!"}
        />
        <CustomInput
          name="password"
          form={form}
          label="Password"
          placeholder={"Please enter password....!"}
          type={"password"}
        />
        <CustomInput
          name="name"
          form={form}
          label="이름"
          placeholder={"이름"}
        />
        <CustomGroupRadio name="gender" label="성별" form={form} />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>생일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !field && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      formatDate(field.value)
                    ) : (
                      <span>yyyy-mm-dd</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomInput
          name="email"
          form={form}
          label="이메일"
          placeholder={"Please enter email....!"}
        />

        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </form>
    </Form>
  );
}
