import type { IResponse } from "./types";

const BASE_URL = "https://norma.education-services.ru/api";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then((res) =>
    checkResponse<T>(res)
  );
};

export const refreshToken = (): Promise<any> => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then((res) => checkResponse<any>(res));
};

export const fetchWithRefresh = async <T>(
  endpoint: string,
  options: any
): Promise<T> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse<T>(res);
  } catch (err: any) {
    
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

     
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      document.cookie = `accessToken=${refreshData.accessToken}; path=/;`;

  
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const logoutRequest = (): Promise<IResponse> => {
  return request<IResponse>("/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};
