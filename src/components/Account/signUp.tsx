"use client";
import { FormEvent, useState } from "react";
import SignUpInput from "@/components/Account/signUpInput";
import { signUpBuyer } from "@/lib/Account.api";
import { useRouter } from "next/navigation";
import {
  emailValidation,
  formattingPhoneNumber,
  passwordSameCheck,
  phoneNumberValidation,
} from "@/components/Account/signUpCalculate";
import { SignUpDuplicateAction } from "@/components/Account/signUpDuplicateAction";

export type AvailableState = "INIT" | "AVAILABLE" | "DUPLICATE";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isUserIdAvailable, setIsUserIdAvailable] = useState(
    "INIT" as AvailableState,
  );
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(
    "INIT" as AvailableState,
  );
  const [isEmailAvailable, setIsEmailAvailable] = useState(
    "INIT" as AvailableState,
  );
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState(
    "INIT" as AvailableState,
  );

  const router = useRouter();

  const signUpClickEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !isUserIdAvailable ||
        !isNickNameAvailable ||
        !isEmailAvailable ||
        !isPhoneNumberAvailable
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

      await signUpBuyer({
        userId,
        name,
        email,
        nickName,
        password,
        phoneNumber,
      });
      alert("회원가입 성공");
      router.push("/");
    } catch (e) {
      alert("회원가입을 실패했습니다. 다시 시도해주세요.");
    }
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
                onChange={(e) => {
                  setIsUserIdAvailable("INIT");
                  setUserId(e.target.value);
                }}
                duplicateButton={{
                  title: "아이디",
                  value: userId,
                  onClick: async () => {
                    await SignUpDuplicateAction(
                      "USER_ID",
                      userId,
                      setIsUserIdAvailable,
                    );
                  },
                  availableState: isUserIdAvailable,
                }}
                type="text"
              />
              <SignUpInput
                id="password"
                text="비밀번호"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              <SignUpInput
                id="passwordCheck"
                text="비밀번호 확인"
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                }}
                type="password"
              />

              <SignUpInput
                id="name"
                text="이름"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />

              <SignUpInput
                id="nickName"
                text="닉네임"
                value={nickName}
                onChange={(e) => {
                  setIsNickNameAvailable("INIT");
                  setNickName(e.target.value);
                }}
                duplicateButton={{
                  title: "닉네임",
                  value: nickName,
                  onClick: async () => {
                    await SignUpDuplicateAction(
                      "NICK_NAME",
                      nickName,
                      setIsNickNameAvailable,
                    );
                  },
                  availableState: isNickNameAvailable,
                }}
                type="text"
              />

              <SignUpInput
                id="email"
                text="이메일"
                value={email}
                onChange={(e) => {
                  setIsEmailAvailable("INIT");
                  setEmail(e.target.value);
                }}
                duplicateButton={{
                  title: "이메일",
                  value: email,
                  onClick: async () => {
                    await SignUpDuplicateAction(
                      "EMAIL",
                      email,
                      setIsEmailAvailable,
                    );
                  },
                  availableState: isEmailAvailable,
                }}
                type="text"
              />

              <SignUpInput
                id="phoneNumber"
                text="핸드폰 번호"
                value={phoneNumber}
                onChange={(e) => {
                  setIsPhoneNumberAvailable("INIT");
                  setPhoneNumber(formattingPhoneNumber(e.target.value));
                }}
                duplicateButton={{
                  title: "핸드폰 번호",
                  value: phoneNumber,
                  onClick: async () => {
                    await SignUpDuplicateAction(
                      "PHONE_NUMBER",
                      phoneNumber,
                      setIsPhoneNumberAvailable,
                    );
                  },
                  availableState: isPhoneNumberAvailable,
                }}
                type="text"
              />

              <input
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
