export interface User {
  loginId: string;
  password: string;
}

//회원가입 데이터
export interface UserInfo {
  loginId: string;
  password: string;
  name: string;
  gender: string;
  birthDate: Date | string;
  email: string;
}

export interface CorpUserInfo extends UserInfo {
  ceoName: string;
  companyName: string;
  businessId: string;
  companyCertificateNumber: string;
}

export type SettingInfo = Omit<UserInfo, "password" | "loginid">;

export interface SuccessLoginData {
  resultCode: string;
  data: SunccessAuth;
  message: string;
}

export interface SunccessAuth {
  companyCode: string | null;
  state: string;
  tokenInfo: TokenData;
  role: string;
}

export interface TokenData {
  accessToken: string;
  grantType: string;
  refreshToken: string;
}
