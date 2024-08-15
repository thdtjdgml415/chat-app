"use  client";

import axios, { AxiosInstance, AxiosResponse } from "axios";

// 인터셉터를 설정하는 함수
const setInterceptors = (instance: AxiosInstance, baseURL: string) => {
  instance.interceptors.request.use(
    (config) => {
      //  localStorage.getItem("accessToken");
      const authToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const refreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null;
        if (refreshToken) {
          try {
            const res = await axios.get(`${baseURL}/api/member/reissue-token`, {
              headers: { Refresh: refreshToken },
            });

            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("refreshToken", res.data.data.refreshToken);
              error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
              return axios(error.config);
            }
          } catch (refreshError) {
            console.error("Token refresh failed", refreshError);
            window.location.href = "/sign-in";
          }
        } else {
          window.location.href = "/sign-in";
        }
      }
      return Promise.reject(error);
    }
  );
};

// Axios 인스턴스를 생성하는 함수
const createInstance = (
  baseURL: string,
  contentType: string,
  responseType: "json" | "blob" = "json"
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Credentials": true,
    },
    responseType,
  });

  setInterceptors(instance, baseURL);

  return instance;
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const http = createInstance(baseURL, "application/json");
const multi = createInstance(baseURL, "multipart/form-data");
const image = createInstance(baseURL, "multipart/form-data", "blob");
const logOut = createInstance(baseURL, "");

export const get = async <T>(url: string, params?: any): Promise<T> => {
  const response: AxiosResponse = await http.get<T>(url, { params });
  return response.data;
};

export const getImage = async (url: string, params?: any) => {
  const response = await image.get<Blob>(url, { params });
  return window.URL.createObjectURL(response.data);
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  const response = await http.post<T>(url, data);
  return response.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
  const response = await multi.put<T>(url, data);
  return response.data;
};

export async function getLogOut<T>(url: string, params?: any): Promise<T> {
  const response = await logOut.get<T>(url, {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      Refresh: localStorage.getItem("refreshToken"),
    },
  });
  return response.data;
}
