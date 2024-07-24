import Service from "@/share/api/Service";

class ConfigService extends Service {
  // 내 계정 정보 요청
  async getAccountConfigData<T>(): Promise<T> {
    const response: T = await this.get("/api/member/info");
    if (!response) {
      throw new Error("Network response was not ok");
    }
    return response;
  }

  // 이미지 정보 요청
  async getAccountImage() {
    const response: string = await this.getImage("/api/member/info/image");

    return response;
  }

  // 승인 대기중인 멤버 리스트
  async getPermissionListData<T>(): Promise<T> {
    const response: T = await this.get("/api/member/admin/info");
    return response;
  }
  // 승인/거절 요청
  async postPermissionMember<T>(data: T): Promise<T> {
    const response: T = await this.put("/api/member/admin/info", data);
    return response;
  }

  async putModfyInfo<T>(data: T): Promise<T> {
    const response: T = await this.put("/api/member/info", data);
    return response;
  }
}
export default new ConfigService();
