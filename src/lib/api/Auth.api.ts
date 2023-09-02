import { EXCEPTION_STATUS } from "@/lib/api/error-code";
import { clearStorage, getStorage } from "@/lib/clinet-storage";

export async function authApi(
  accessToken: string,
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Authorization: accessToken,
    },
  });

  const result = await response.json();
  if (
    response.status === 500 &&
    result.errorCode === EXCEPTION_STATUS.LOGIN_TOKEN_EXPIRE.errorCode
  ) {
    // 토큰이 만료되었을 경우
    // refresh token 이 만료되지 않앗을 경우 사용
    const refreshToken = getStorage("refreshToken");
    const refreshTokenExpire = getStorage("refreshTokenExpireAt");

    if (!refreshToken || !refreshTokenExpire) {
      throw new Error("refreshToken 이 존재하지 않습니다.");
    }

    const now = new Date();
    const refreshTokenExpireDate = new Date(refreshTokenExpire);
    if (refreshTokenExpireDate > now) {
      clearStorage();
      alert("로그인 해주세요");
      throw new Error("토큰 만료");
    }

    return await authApi(accessToken, input, init);
  }

  return result;
}
