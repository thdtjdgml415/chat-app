"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/share/ui/button";
import { Calendar } from "@/share/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/share/ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "@/share/ui/popover";

import { cn, formatDate, formatDated, splitDate } from "@/share/lib/utils";

import { CalendarIcon } from "lucide-react";

import CustomGroupRadio from "@/share/atom-components/custom-group-Radio";
import CustomInput from "@/share/atom-components/custom-input";

import useToggle from "@/hooks/useToggleStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutationModifyAccountInfo } from "../hooks/useMutationModifyAccountInfo";

import { formSchema } from "./formSchema";

import { UploadIcon } from "@/public/Images/side-menuSvg";
import { Input } from "@/share";
import ErrorAlert from "@/share/components/error-alert";
import Image from "next/image";
import { useQueryGetAccountData } from "../hooks/useQueryAccount";
import ProfileImage from "./profile-Image";
// import UploadImage from "./upload-image";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export default function UserInfoForm() {
  const { isToggle, toggleFn } = useToggle();
  const [preview, setPreview] = useState("");
  const mutation = useMutationModifyAccountInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_image: "",
      state: "",
      profile: "",
      role: "",
      id: 0,
      companyCode: "",
      gender: "",
      name: "",
      email: "",
    },
  });

  const { data, isLoading, error } = useQueryGetAccountData();

  useEffect(() => {
    if (data) {
      form.reset({ ...data, birthDate: formatDated(data.birthDate) });
    }
  }, [data]);

  if (isLoading) return <p className=" bg-orange-400">로딩 중...</p>;
  if (error) return <ErrorAlert error={error} />;

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    const { birthDate, profile_image, ...infoData } = data;

    const formatedDate = formatDate(birthDate);
    const format = { birthDate: formatedDate, ...infoData };
    const reallyData = { password: "12345678abc!", ...format };
    const modifydata = new Blob([JSON.stringify(reallyData)], {
      type: "application/json",
    });
    formData.append("member", modifydata);
    if (profile_image) {
      formData.append("image", profile_image[0]);
    }

    mutation.mutate(formData);
  });
  // console.log(formatDate(data.birthDate));
  return (
    <>
      <div className="min-w-80 w-96 box-border">
        <h1 className="text-xl my-10">내정보</h1>
        <div className="bg-[#F0F0F0] rounded-md py-5 px-16 mb-10 flex items-center">
          <div className="mr-20">
            <p className="mb-2">ID: {data?.loginId}</p>
            <span className="sr-only">계정</span>
            <p className="mb-2">이름: {data?.name}</p>
            <span className="sr-only">이름</span>
            <p>회사코드 : {data?.companyCode}</p>
          </div>
          <ProfileImage />
        </div>
      </div>
      <Form {...form}>
        {isToggle === true ? (
          <form onSubmit={onSubmit} className="w-60 space-y-4">
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>
                      프로필 이미지 수정
                      {preview !== "" ? (
                        <Image
                          src={preview}
                          width={100}
                          height={100}
                          alt="프로필 이미지"
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-[100px] h-[100px] rounded-full bg-secondary flex justify-center items-center hover:bg-secondary/70 cursor-pointer">
                          <UploadIcon />
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
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
                          !field && "text-muted-foreground text-black"
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
            <div className="flex">
              <div className="w-20 h-10 mr-6">
                <Button
                  onClick={toggleFn}
                  className={cn(buttonVariants({ variant: "destructive" }))}
                >
                  취소
                </Button>
              </div>

              <div className="w-20 h-10">
                <Button type="submit" className="">
                  수정완료
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <form className="min-w-80 space-y-4">
            <p>성별 : {data?.gender === "MAN" ? "남" : "여"} </p>

            {data?.birthDate ? <p>생일 : {splitDate(data.birthDate)}</p> : ""}
            <p>이메일 : {data?.email}</p>
            <div className="w-20 h-10">
              <Button onClick={toggleFn}>수정</Button>
            </div>
          </form>
        )}
      </Form>
    </>
  );
}
