import axios, { Axios } from "axios";
import { LoginResponse } from "../pages/Account/Login/Login";
import { ClientStorage } from "./ClientStorage";
import { isBiggerLeftDate } from "../utils/date";

export const serverUrl = "192.168.0.16:5000";

export interface ResponseData<T> {
  isSuccess: boolean;
  content: T;
  errorCode?: number;
}

export const Client: Axios = axios.create({
  baseURL: `http://${serverUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthTokenStrategyWithToken = async (): Promise<string> => {
  const accessToken = ClientStorage.getTokenByKey("accessToken");
  const accessTokenExpireAt = ClientStorage.getTokenByKey("accessTokenExpireAt");

  const currentDate = new Date();
  const accessTokenExpireDate = new Date(accessTokenExpireAt);

  if (isBiggerLeftDate(currentDate, accessTokenExpireDate)) {
    const refreshToken = ClientStorage.getTokenByKey("accessToken");
    const refreshTokenExpireAt = ClientStorage.getTokenByKey("accessTokenExpireAt");
    const refreshTokenExpireDate = new Date(refreshTokenExpireAt);
    if (isBiggerLeftDate(currentDate, refreshTokenExpireDate)) {
      ClientStorage.clear();
      throw new Error("token 만료");
    }
    const response = await axios.get("/buyer/refresh-login", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
    const responseData = response.data as ResponseData<LoginResponse>;
    const result = responseData.content;

    ClientStorage.setTokenAfterLogin(result);
  }
  return accessToken;
};

Client.interceptors.request.use(async (config) => {
  try {
    const accessToken = await AuthTokenStrategyWithToken();

    config.headers.Authorization = `Bearer ${accessToken}`;
  } catch (e) {
  } finally {
    return config;
  }
});

Client.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async function (error) {
    // await AuthTokenStrategy();
    // if() // TODO Error 토큰 만료 에러 시에 위의 로직 실행
    console.log(error);
    // 10002
    return Promise.reject(error);
  },
);
