import { get, post, getLogOut } from "@/share/api/Service";
import { SuccessLoginData, User } from "../model/auth";

// 로그인 함수
export const login = async ({
  loginId,
  password,
}: User): Promise<SuccessLoginData> => {
  try {
    return await post<SuccessLoginData>("api/member/login", {
      loginId,
      password,
    });
  } catch (error) {
    throw error;
  }
};

// 구글 로그인 함수
export const googleLogin = () => {
  return post("/api/member/login/google");
};

// 회원가입 함수
export const postSignUp = async <TUserInfo>(
  data: TUserInfo
): Promise<TUserInfo> => {
  try {
    return await post<TUserInfo>("api/member/signup", data);
  } catch (error) {
    throw error;
  }
};

// 토큰 갱신 함수
export const getRefresh = async (data: string) => {
  try {
    return await get("/api/member/reissue-token", data);
  } catch (error) {
    throw error;
  }
};

// 로그아웃 함수
export const getOut = () => {
  return getLogOut("api/member/logout");
};

// 유저 정보 가져오기 함수
export const getUserInfo = () => {
  return get("/api/member/user");
};
