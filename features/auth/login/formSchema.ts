import { z } from "zod";

export const formSchema = z.object({
  loginId: z.string().min(2, {
    message: "아이디를 입력해주세요",
  }),
  password: z
    .string()
    .min(8, {
      message:
        "비밀번호는 최소 8자리 이상 영문자와 특수문자를 포함한 8자리 이상 입력해주세요!",
    })
    .max(20, {
      message: "비밀번호는 최대 20자리 이하로 입력해주세요!",
    })
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: "비밀번호에는 영문자가 포함되어야 합니다.",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "비밀번호에는 숫자가 포함되어야 합니다.",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "비밀번호에는 특수문자가 포함되어야 합니다.",
    }),
});
