import useCustomQuery from "../../../share/hooks/useCustomQuery";
import {
  getAccountConfigData,
  getAccountImage,
  getPermissionListData,
} from "../api/ConfigService";

import { ApiResponse, ResUser, UserConfig } from "../model/myConfig";

// 계정 정보 불러오는 query
export const useQueryGetAccountData = () => {
  return useCustomQuery(
    ["configAccount"],
    () => getAccountConfigData(),
    (res: ResUser): UserConfig => res.data
  );
};

// 프로필 이미지 불러오는 query
export const useQueryGetProfile = () => {
  return useCustomQuery(
    ["profileImage"],
    () => getAccountImage(),
    (res: Blob): Blob => res
  );
};

// 관리자 승인 리스트
export const useQueryPermissionMember = () => {
  return useCustomQuery(
    ["permissionList"],
    () => getPermissionListData(),
    (res: ApiResponse): ApiResponse => res
  );
};
