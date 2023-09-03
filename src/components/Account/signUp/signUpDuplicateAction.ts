import { Dispatch, SetStateAction } from "react";
import {
  isExistBuyerEmail,
  isExistBuyerNickName,
  isExistBuyerPhoneNumber,
  isExistBuyerUserId,
} from "@/lib/api/Account.api";
import { AvailableState } from "@/components/Account/signUp/signUp";

type DuplicationType = "USER_ID" | "NICK_NAME" | "EMAIL" | "PHONE_NUMBER";
export const SignUpDuplicateAction = async (
  type: DuplicationType,
  value: string,
  setFunction: Dispatch<SetStateAction<AvailableState>>,
) => {
  let availableState: AvailableState;
  let response: boolean = true;

  if (type === "USER_ID") {
    response = await isExistBuyerUserId(value);
  }

  if (type === "NICK_NAME") {
    response = await isExistBuyerNickName(value);
  }

  if (type === "EMAIL") {
    response = await isExistBuyerEmail(value);
  }

  if (type === "PHONE_NUMBER") {
    response = await isExistBuyerPhoneNumber(value);
  }

  if (response) {
    setFunction("DUPLICATE");
  }
  setFunction("AVAILABLE");
};
