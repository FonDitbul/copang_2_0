import { BuyerLoginResponse, loginBuyer } from "@/lib/Account-login.api";
import { setStorage } from "@/lib/clinet-storage";

export const loginByServer = async (userId: string, password: string) => {
  const response = await loginBuyer({ userId, password });

  setStorage("accessToken", response.accessToken.value);
  setStorage("accessTokenExpireAt", response.accessToken.expiredAt);
  setStorage("refreshToken", response.refreshToken.value);
  setStorage("refreshTokenExpireAt", response.refreshToken.expiredAt);
};
