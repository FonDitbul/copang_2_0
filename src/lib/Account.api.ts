// 구현해야할 API 목록
// 1. 회원가입
// 1.1 중복 id 존재 여부 확인
// 1.2 중복 email 존재 여부 확인
// 2. access token 발급 받기
// 3. refresh token 발급 받기

// etc
// 1. 이메일 변경
// 2. 닉네임 변경
// 3. 핸드폰 번호 변경
// 4. 비밀번호 변경

// export async function

import { serverUrl } from "@/lib/api";
import { Buyer } from "@/interface/Buyer";

export interface ISignUpReq {
  userId: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string;
}

type SignUpBuyer = Partial<Buyer>;

export async function signUpBuyer(signUpReq: ISignUpReq): Promise<SignUpBuyer> {
  const response = await fetch(`http://${serverUrl}/buyer/sign-up`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpReq),
  });

  if (response.status != 201) {
    throw new Error("api error");
  }

  const result = await response.json();

  return result.content;
}

export async function loginBuyer() {
  const response = await fetch(`http://${serverUrl}/buyer/login`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "copang",
      password: "copang1234!",
    }),
  });

  // if (response.status !== 200) {
  //   throw new Error("api Error");
  // }
  const result = await response.json();

  return result.content;
}
