// import { EXCEPTION_STATUS } from "src/context/error-code";
// import { clearStorage, getStorage } from "src/lib/clinet-storage";
// import { Response } from "src/context/interface/response";
// import { BuyerLoginResponse } from "src/context/Account-login.api";
// import { Buyer } from "src/interface/Buyer";
//
// export type BuyerAccount = Omit<
//   Buyer,
//   "password" | "createdAt" | "updatedAt"
// > & {
//   createdAt: string;
//   updatedAt: string;
// };
//
// export async function authApi<T>(
//   accessToken: string,
//   input: RequestInfo | URL,
//   init?: RequestInit,
// ): Promise<Response<T>> {
//   const response = await fetch(input, {
//     ...init,
//     headers: {
//       Authorization: "Bearer " + accessToken,
//     },
//   });
//
//   const result: Response<T> = await response.json();
//   if (
//     response.status === 500 &&
//     result.errorCode === EXCEPTION_STATUS.LOGIN_TOKEN_EXPIRE.errorCode
//   ) {
//     const refreshToken = getStorage("refreshToken");
//     const refreshTokenExpire = getStorage("refreshTokenExpireAt");
//
//     if (!refreshToken || !refreshTokenExpire) {
//       throw new Error("refreshToken 이 존재하지 않습니다.");
//     }
//
//     // 만료처리
//     const now = new Date();
//     const refreshTokenExpireDate = new Date(refreshTokenExpire);
//     if (refreshTokenExpireDate < now) {
//       clearStorage();
//       alert("로그인 해주세요");
//       throw new Error("토큰 만료");
//     }
//
//     return await authApi(accessToken, input, init);
//   }
//
//   return result;
// }
