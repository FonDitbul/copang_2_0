import { Modal } from "../../Common/atom/Modal";
import React, { useState } from "react";
import { SignUpDuplicateAction } from "../SignUpDuplicationAction";
import SignUpInput from "../SignUpInput.Mole";
import { AvailableState, InputOnChangeType } from "../../../pages/Account/SignUp/SignUp";
import Button from "../../Common/atom/Button";
import { Client } from "../../../context/api";

interface PropsType {
  onClose: Function;
}

export default function NickNameChangeModal({ onClose }: PropsType) {
  const [nickName, setNickName] = useState("");
  const [isNickNameAvailable, setIsNickNameAvailable] = useState("INIT" as AvailableState);

  const nickNameChangeClickEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickName) {
      return alert("닉네임을 입력해 주세요.");
    }
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return alert("재 로그인 바랍니다.");
    }

    Client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
    await Client.post("/buyer/change/nick-name", {
      nickName: nickName,
    });

    alert("변경 완료");
    location.reload();
    return;
  };

  return (
    <Modal onClose={onClose}>
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
      <Button disabled={isNickNameAvailable !== "AVAILABLE" ? true : false} onClick={nickNameChangeClickEvent}>
        변경하기
      </Button>
    </Modal>
  );
}
