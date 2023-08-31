import { BuyerLoginResponse, loginBuyer } from "@/lib/Account-login.api";

export const loginByServer = async (userId: string, password: string) => {
  const response = await loginBuyer({ userId, password });
  console.log(response);

  localStorage.setItem("accessToken", response.accessToken.value);
  localStorage.setItem("accessTokenExpireAt", response.accessToken.expiredAt);
  localStorage.setItem("refreshToken", response.refreshToken.value);
  localStorage.setItem("refreshTokenExpireAt", response.refreshToken.expiredAt);
};
