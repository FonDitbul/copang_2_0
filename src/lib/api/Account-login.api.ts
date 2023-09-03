import { serverUrl } from "@/lib/api/api";
import { Response } from "@/lib/api/interface/response";

export interface BuyerLoginRequest {
  userId: string;
  password: string;
}
export interface Token {
  value: string;
  expiredAt: string;
}
export interface BuyerLoginResponse {
  accessToken: Token;
  refreshToken: Token;
}

export async function loginBuyer(
  login: BuyerLoginRequest,
): Promise<BuyerLoginResponse> {
  console.log(login);
  const response = await fetch(`http://${serverUrl}/buyer/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...login,
    }),
  });
  if (response.status === 500) {
    throw new Error("로그인 다시 시도하기");
  }
  const result: Response<BuyerLoginResponse> = await response.json();
  return result.content;
}
