import { get, getImage, put } from "@/share/api/Service";

// 내 계정 정보 요청 함수
export const getAccountConfigData = async <T>(): Promise<T> => {
  const response: T = await get("/api/member/info");
  if (!response) {
    throw new Error("Network response was not ok");
  }
  return response;
};

// 이미지 정보 요청 함수
export const getAccountImage = async (): Promise<string> => {
  const response: string = await getImage("/api/member/info/image");
  return response;
};

// 승인 대기중인 멤버 리스트 함수
export const getPermissionListData = async <T>(): Promise<T> => {
  const response: T = await get("/api/member/admin/info");
  return response;
};

// 승인/거절 요청 함수
export const postPermissionMember = async <T>(data: T): Promise<T> => {
  const response: T = await put("/api/member/admin/info", data);
  return response;
};

// 정보 수정 함수
export const putModifyInfo = async <T>(data: T): Promise<T> => {
  const response: T = await put("/api/member/info", data);
  return response;
};
