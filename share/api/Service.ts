import axios, { AxiosInstance } from "axios";

class Service {
  protected http: AxiosInstance;
  protected multi: AxiosInstance;
  protected image: AxiosInstance;
  protected logOut: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    this.http = this.createInstance(baseURL!, "application/json");
    this.multi = this.createInstance(baseURL!, "multipart/form-data");
    this.image = this.createInstance(baseURL!, "multipart/form-data", "blob");
    this.logOut = this.createInstance(baseURL!, "");
  }

  private createInstance(
    baseURL: string,
    contentType: string,
    responseType: "json" | "blob" = "json"
  ): AxiosInstance {
    const instance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Credenials": true,
      },
      responseType,
    });

    instance.interceptors.request.use(
      (config) => {
        const authToken = localStorage.getItem("access");
        if (authToken) {
          const newConfig = { ...config };
          newConfig.headers.Authorization = `Bearer ${authToken}`;
          return newConfig;
        }
        return config;
      },
      (error) => {
        console.error("endpoint 요청 에러발생 -------", error);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      async (response) => {
        if (response.status === 404) {
          console.log("404 페이지로 넘어가야 함!");
        }

        return response;
      },

      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log("401 error find");
          const data = error.response.data;
          if (data.error === "Unauthorized") {
            const refresh = localStorage.getItem("refresh");
            console.log("refresh 존재하는지? ===========", refresh);
            if (refresh) {
              try {
                const response = await axios.get(
                  `${baseURL}api/member/reissue-token`, // Ensure URL is correctly formatted
                  { headers: { Refresh: refresh } }
                );
                console.log("${baseURL} ", response);
                if (response.status === 200) {
                  // 새 토큰을 localStorage에 저장
                  console.log("토큰 지우고");
                  localStorage.setItem(
                    "access",
                    response.data.data.accessToken
                  );
                  localStorage.setItem(
                    "refresh",
                    response.data.data.refreshToken
                  );
                  console.log("토큰 재 셋팅");
                }
              } catch (refreshError) {
                console.error("Refresh token request failed:", refreshError);
              }
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  protected async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.http.get<T>(url, { params });
    return response.data;
  }

  protected async getLogOut<T>(url: string, params?: any): Promise<T> {
    const response = await this.logOut.get<T>(url, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Refresh: localStorage.getItem("refresh"),
      },
    });
    return response.data;
  }

  protected async getImage(url: string, params?: any) {
    const response = await this.image.get<Blob>(url, { params });
    return window.URL.createObjectURL(response.data);
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.http.post<T>(url, data);
    return response.data;
  }

  protected async put<T>(url: string, data?: T): Promise<T> {
    const response = await this.multi.put<T>(url, data);
    return response.data;
  }

  setAuthToken(token: string) {
    localStorage.setItem("access", token);
  }
  setAuthRefreshToken(token: string) {
    localStorage.setItem("refresh", token);
  }
}

export default Service;
