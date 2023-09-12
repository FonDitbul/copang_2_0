import { Modal } from "../../Common/atom/Modal";
import React, { useState } from "react";
import { SignUpDuplicateAction } from "../SignUpDuplicationAction";
import SignUpInput from "../SignUpInput.Mole";
import { AvailableState, InputOnChangeType } from "../../../pages/Account/SignUp/SignUp";
import Button from "../../Common/atom/Button";
import { Client } from "../../../context/api";
import { formattingPhoneNumber } from "../SignUp.Logic";

interface PropsType {
  onClose: Function;
}

export default function PhoneNumberChangeModal({ onClose }: PropsType) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState("INIT" as AvailableState);

  const phoneNumberChangeClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!phoneNumber) {
      return alert("닉네임을 입력해 주세요.");
    }
    const formatPhoneNumber = formattingPhoneNumber(phoneNumber);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return alert("재 로그인 바랍니다.");
    }

    Client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
    await Client.post("/buyer/change/phone-number", {
      phoneNumber: formatPhoneNumber,
    });

    alert("변경 완료");
    location.reload();
    return;
  };

  return (
    <Modal onClose={onClose}>
      <SignUpInput
        id="phoneNumber"
        text="핸드폰 번호"
        value={phoneNumber}
        onChange={(e: InputOnChangeType) => {
          setIsPhoneNumberAvailable("INIT");
          setPhoneNumber(e.target.value);
        }}
        duplicateButton={{
          title: "핸드폰 번호",
          value: phoneNumber,
          onClick: async () => {
            await SignUpDuplicateAction("NICK_NAME", phoneNumber, setIsPhoneNumberAvailable);
          },
          availableState: isPhoneNumberAvailable,
        }}
        type="text"
      />
      <Button disabled={isPhoneNumberAvailable !== "AVAILABLE" ? true : false} onClick={phoneNumberChangeClickEvent}>
        변경하기
      </Button>
    </Modal>
  );
}
