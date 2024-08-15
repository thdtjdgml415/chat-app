"use server";

import { formSchema } from "@/features/auth/login/formSchema";

export type FormState =
  | {
      errors?: {
        loginId?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function signin(state: FormState, formData: FormData) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validatedFields = formSchema.safeParse({
    loginId: formData.get("loginId"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(`${apiBaseUrl}api/member/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loginId: formData.get("loginId"),
        password: formData.get("password"),
      }),
    });
    console.log("res", res);

    // 응답이 성공적이지 않을 경우
    if (res.status === 400) {
      // redirect("/");
      // 성공적인 응답 처리
      return {
        message: "아이디 또는 비밀번호를 확인해 주세요!",
      };
    } else {
      return res.json();
    }
  } catch (error) {
    console.error("Login failed", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
