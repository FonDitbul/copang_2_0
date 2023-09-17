import { ClientStorage } from "./ClientStorage";
import { isBiggerLeftDate } from "../utils/date";
import axios from "axios";
import { LoginResponse } from "../pages/Account/Login/Login";
import { ResponseData, serverUrl } from "./api";

export const AuthRefreshTokenStrategy = async (): Promise<string> => {
  const currentDate = new Date();
  const refreshToken = ClientStorage.getTokenByKey("refreshToken");
  const refreshTokenExpireAt = ClientStorage.getTokenByKey("refreshTokenExpireAt");
  const refreshTokenExpireDate = new Date(refreshTokenExpireAt);
  if (isBiggerLeftDate(currentDate, refreshTokenExpireDate)) {
    ClientStorage.clear();
    throw new Error("token 만료");
  }
  const response = await axios.get(`http://${serverUrl}/buyer/refresh-login`, {
    headers: {
      Authorization: "Bearer " + refreshToken,
    },
  });
  const responseData = response.data as ResponseData<LoginResponse>;
  const result = responseData.content;

  ClientStorage.setTokenAfterLogin(result);
  return result.accessToken.value;
};
