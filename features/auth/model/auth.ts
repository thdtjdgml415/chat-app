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
  data: {
    companyCode: string | null;
    state: string;
    tokenInfo: {
      accessToken: string;
      grantType: string;
      refreshToken: string;
    };
    role: string;
    message: string;
    resultCode: string;
  };
}
