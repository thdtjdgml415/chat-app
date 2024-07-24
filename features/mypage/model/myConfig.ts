export interface MyConfigProps {
  birthDate: string;
  companyCode: string;
  id: number;
}
// 승인 대기 리스트
export interface UserConfig {
  birthDate: string;
  companyCode: string;
  email: string;
  gender: string;
  id: number;
  loginId: string;
  name: string;
  profile: string;
  role: string;
  state: string;
}

export interface ResUser {
  data: UserConfig;
}

// API 전체 응답에 대한 인터페이스
export interface ApiResponse {
  data: UserConfig[];
  message: string;
  resultCode: string;
}

export const menuList = [
  {
    title: "사용자 설정",
    menu: [
      { key: 1, item: "계정설정", link: "accountConfig" },
      { key: 2, item: "알림", link: "alarmConfig" },
      { key: 3, item: "친구", link: "friendConfig" },
      { key: 4, item: "채팅", link: "chatConfig" },
    ],
  },
  {
    title: "관리자 설정",
    menu: [
      { key: 1, item: "관리자 계정설정", link: "adminAccount" },
      { key: 2, item: "관리자 승인", link: "permisson" },
    ],
  },
];
