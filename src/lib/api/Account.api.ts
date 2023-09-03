import { serverUrl } from "@/lib/api/api";
import { Buyer } from "@/interface/Buyer";

export interface ISignUpReq {
  userId: string;
  password: string;
  name: string;
  nickName: string;
  email: string;
  phoneNumber: string;
}

export type SignUpBuyer = Partial<Buyer>;

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

export async function isExistBuyerUserId(userId: string): Promise<boolean> {
  const response = await fetch(
    `http://${serverUrl}/buyer/exist-user-id/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (response.status !== 200) {
    throw new Error("api Error");
  }
  const result = await response.json();

  return result.content;
}

export async function isExistBuyerNickName(nickName: string): Promise<boolean> {
  const response = await fetch(
    `http://${serverUrl}/buyer/exist-user-nick-name/${nickName}`,
  );
  if (response.status !== 200) {
    throw new Error("api Error");
  }
  const result = await response.json();

  return result.content;
}

export async function isExistBuyerEmail(email: string): Promise<boolean> {
  const response = await fetch(
    `http://${serverUrl}/buyer/exist-user-email/${email}`,
  );
  if (response.status !== 200) {
    throw new Error("api Error");
  }
  const result = await response.json();

  return result.content;
}

export async function isExistBuyerPhoneNumber(
  phoneNumber: string,
): Promise<boolean> {
  const response = await fetch(
    `http://${serverUrl}/buyer/exist-user-email/${phoneNumber}`,
  );
  if (response.status !== 200) {
    throw new Error("api Error");
  }
  const result = await response.json();

  return result.content;
}

export async function getBuyerAccount(

) {

}