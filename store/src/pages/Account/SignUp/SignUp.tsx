import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import SignUpInput from "../../../components/Account/SignUpInput.Mole";

import {
  emailValidation,
  formattingPhoneNumber,
  passwordSameCheck,
  phoneNumberValidation,
} from "../../../components/Account/SignUp.Logic";
import { Client, ResponseData } from "../../../context/api";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Common/Atom/Input";
import { SignUpDuplicateAction } from "../../../components/Account/SignUpDuplicationAction";

export type AvailableState = "INIT" | "AVAILABLE" | "DUPLICATE";

export type DuplicationType = "USER_ID" | "NICK_NAME" | "EMAIL" | "PHONE_NUMBER";

export type InputOnChangeType = { target: { value: string } };

export default function AccountSignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isUserIdAvailable, setIsUserIdAvailable] = useState("INIT" as AvailableState);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState("INIT" as AvailableState);
  const [isEmailAvailable, setIsEmailAvailable] = useState("INIT" as AvailableState);
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState("INIT" as AvailableState);

  const navigate = useNavigate();

  const signUpClickEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isUserIdAvailable !== "AVAILABLE" ||
      isNickNameAvailable !== "AVAILABLE" ||
      isEmailAvailable !== "AVAILABLE" ||
      isPhoneNumberAvailable !== "AVAILABLE"
    ) {
      return alert("중복 확인 필요");
    }
    if (!passwordSameCheck(password, passwordCheck)) {
      return alert("비밀번호가 다르게 입력되었습니다.");
    }

    if (!emailValidation(email)) {
      return alert("이메일 형식이 올바르지 않습니다.");
    }

    if (!phoneNumberValidation(phoneNumber)) {
      return alert("핸드폰 번호 형식이 올바르지 않습니다.");
    }
    const signUpResponse = await Client.post("/buyer/sign-up", {
      userId,
      name,
      email,
      nickName,
      password,
      phoneNumber,
    });

    if (signUpResponse.status !== 201) {
      return alert("회원가입이 실패하였습니다");
    }
    alert("회원가입 성공");
    navigate("/");

    return;
  };

  return (
    <section className="w-screen">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-6">
            <h1>copang 회원가입 </h1>
            <form className="space-y-4 md:spac-y-6" onSubmit={signUpClickEvent}>
              <SignUpInput
                id="id"
                text="아이디"
                value={userId}
                onChange={(e: InputOnChangeType) => {
                  setIsUserIdAvailable("INIT");
                  setUserId(e.target.value);
                }}
                duplicateButton={{
                  title: "아이디",
                  value: userId,
                  onClick: async () => {
                    await SignUpDuplicateAction("USER_ID", userId, setIsUserIdAvailable);
                  },
                  availableState: isUserIdAvailable,
                }}
                type="text"
              />
              <SignUpInput
                id="password"
                text="비밀번호"
                value={password}
                onChange={(e: InputOnChangeType) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              <SignUpInput
                id="passwordCheck"
                text="비밀번호 확인"
                value={passwordCheck}
                onChange={(e: InputOnChangeType) => {
                  setPasswordCheck(e.target.value);
                }}
                type="password"
              />

              <SignUpInput
                id="name"
                text="이름"
                value={name}
                onChange={(e: InputOnChangeType) => {
                  setName(e.target.value);
                }}
                type="text"
              />

              <SignUpInput
                id="nickName"
                text="닉네임"
                value={nickName}
                onChange={(e: InputOnChangeType) => {
                  setIsNickNameAvailable("INIT");
                  setNickName(e.target.value);
                }}
                duplicateButton={{
                  title: "닉네임",
                  value: nickName,
                  onClick: async () => {
                    await SignUpDuplicateAction("NICK_NAME", nickName, setIsNickNameAvailable);
                  },
                  availableState: isNickNameAvailable,
                }}
                type="text"
              />

              <SignUpInput
                id="email"
                text="이메일"
                value={email}
                onChange={(e: InputOnChangeType) => {
                  setIsEmailAvailable("INIT");
                  setEmail(e.target.value);
                }}
                duplicateButton={{
                  title: "이메일",
                  value: email,
                  onClick: async () => {
                    await SignUpDuplicateAction("EMAIL", email, setIsEmailAvailable);
                  },
                  availableState: isEmailAvailable,
                }}
                type="text"
              />

              <SignUpInput
                id="phoneNumber"
                text="핸드폰 번호"
                value={phoneNumber}
                onChange={(e: InputOnChangeType) => {
                  setIsPhoneNumberAvailable("INIT");
                  setPhoneNumber(formattingPhoneNumber(e.target.value));
                }}
                duplicateButton={{
                  title: "핸드폰 번호",
                  value: phoneNumber,
                  onClick: async () => {
                    await SignUpDuplicateAction("PHONE_NUMBER", phoneNumber, setIsPhoneNumberAvailable);
                  },
                  availableState: isPhoneNumberAvailable,
                }}
                type="text"
              />

              <Input
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                value="회원가입하기"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
