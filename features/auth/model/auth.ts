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

export interface TokenData {
  accessToken: string;
  grantType: string;
  refreshToken: string;
}

export interface SunccessAuth {
  companyCode: string | null;
  state: string;
  tokenInfo: TokenData;
  role: string;
}
// {
//   "resultCode": "SUCCESS",
//   "data": {
//       "tokenInfo": {
//           "grantType": "Bearer",
//           "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25nIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJ1c2VySWQiOjMsImlhdCI6MTcyMjE2OTczMiwiZXhwIjoxNzIyMTczMzMyfQ.mhRQu_joitlDA5OVyOr-1dbmBp-VpZWwOXkHdTP7zXU",
//           "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb25nIiwiYXV0aCI6IlJPTEVfQURNSU4iLCJ1c2VySWQiOjMsImV4cCI6MTcyNDc2MTczMn0.R20XTNAGTRz-shYf_ZV7Y25Zx5KzN6XttWwDPaARgQA"
//       },
//       "role": "ADMIN",
//       "state": "APPROVED",
//       "companyCode": "2"
//   },
//   "message": "정상 처리 되었습니다."
// }
